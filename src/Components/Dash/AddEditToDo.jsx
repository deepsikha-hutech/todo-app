import React, { useEffect } from "react";
import { Form, Row, Col, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const AddEditToDo = ({
  mode,
  customer,
  onAddCustomerSuccess,
  onEditCustomerSuccess,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === "edit" && customer) {
      console.log({ customer });
      form.setFieldsValue({
        ...customer,
        addedOn: dayjs(customer?.addedOn),
        deadline: dayjs(customer?.deadline),
      });
    } else {
      form.resetFields();
    }
  }, [mode, customer]);

  const handleFormSubmit = (values) => {
    console.log({ values });
    if (mode === "add") {
      onAddCustomerSuccess && onAddCustomerSuccess(values);
    } else if (mode === "edit") {
      onEditCustomerSuccess && onEditCustomerSuccess(values);
    }
    form.resetFields();
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
              <Form.Item name="addedOn" label="AddedOn">
                <DatePicker />
              </Form.Item>
              <Form.Item name="deadline" label="Deadline">
                <DatePicker />
                <DatePicker onChange={onChange} />
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
