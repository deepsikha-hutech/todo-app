import React, { useEffect } from "react";
import { Form, Row, Col, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import variable from "../../assets/variables";
import Cookie from "js-cookies";

const AddEditToDo = ({ mode, customer, onSaveSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && customer) {
      console.log({ customer });
      form.setFieldsValue({
        ...customer,
        addedOn: dayjs(customer?.addedOn),
        deadLine: dayjs(customer?.deadLine),
      });
    } else {
      form.resetFields();
    }
  }, [mode, customer]);

  const handleFormSubmit = async (values) => {
    console.log({ values });
    const token = Cookie.getItem("accessToken");

    if (mode === "add") {
      try {
        const { data } = await axios.post(
          `${variable?.TODO_API_URL}/api/v1/todo/add`,
          values,
          { headers: { Authorization: token } }
        );

        if (data?.todo?._id) {
          alert("todo added");

          form.resetFields();
          onSaveSuccess(data.todo, "add");
        } else {
          alert(" Failed to add todo, try again");
        }
      } catch (error) {
        console.log(error);
        alert("Signup Failed, try again");
      }
    } else if (mode === "edit") {
      try {
        const { data } = await axios.put(
          `${variable?.TODO_API_URL}/api/v1/todo/update/${customer?._id}`,
          values,
          { headers: { Authorization: token } }
        );

        if (data?.todo?._id) {
          form.resetFields();
          onSaveSuccess(data.todo, "edit");
        } else {
          alert(" Failed to update todo, try again");
        }
      } catch (error) {
        console.log(error);
        alert("something went wrong, try again");
      }
    }
  };

  const onChange = (_, dateStr) => {
    console.log("onChange:", dateStr);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ color: "red", fontWeight: "bold", fontSize: "2rem" }}>
        {mode === "add" ? "Add Task" : "Edit Task"}
      </div>
      <div className="form-container">
        <Form form={form} onFinish={handleFormSubmit}>
          <Row>
            <Col xs={24} sm={18} md={12} lg={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="addedOn" label="Added On">
                <DatePicker showTime />
              </Form.Item>
              <Form.Item name="deadLine" label="Deadline">
                <DatePicker showTime onChange={onChange} />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                {mode === "add" ? "Save" : "Update"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AddEditToDo;
