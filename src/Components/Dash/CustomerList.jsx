//
import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import Cookie from "js-cookies";
import axios from "axios";
import variable from "../../assets/variables";

const CustomerList = (props) => {
  // const { customers, onEditClick } = props;
  // const [editCustomer, setEditCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);

  const [params, setParams] = useState({ page: 1, limit: 10, search: null });

  const handleSearchChange = (e) => {
    setParams({ ...params, search: e.target.value });
  };

  useEffect(() => {
    getTodos();
  }, [params, props]);

  async function deleteTodos(todoId) {
    try {
      // alert("todo id" + todoId);
      const token = Cookie.getItem("accessToken");
      const { data } = await axios.delete(
        `${variable?.TODO_API_URL}/api/v1/todo/delete/${todoId}`,
        { headers: { Authorization: token } }
      );

      if (data?.todo?._id) {
        if (customerCount - 1 == (params?.page - 1) * params?.limit) {
          setParams({ ...params, page: params.page - 1 });
        } else getTodos();
      } else {
        alert("Failed to delete todo, try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  async function getTodos() {
    try {
      const token = Cookie.getItem("accessToken");
      // alert(token);

      const { data } = await axios.get(
        `${variable?.TODO_API_URL}/api/v1/todo/getall`,
        { params, headers: { Authorization: token } }
      );
      setCustomers(data?.todo);
      setCustomerCount(data?.totalCount);
    } catch (error) {
      console.log(error);
      alert("something went wrong, try again");
    }
  }

  //   // alert("search");
  //   if (e.key === "Enter") {
  //     try {
  //       const token = Cookie.getItem("accessToken");
  //       const { data } = await axios.get(
  //         `${variable?.TODO_API_URL}/api/v1/todo/getall`,
  //         {
  //           params,
  //           headers: { Authorization: token },
  //         }
  //       );
  //       // setCustomers(data?.todo);
  //       if (data?.todo?._id) {
  //         getTodos(data.todo, "search");
  //         alert("todo found ");
  //       } else {
  //         alert(" Failed to search todo, try again");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       alert("something went wrong, try again");
  //     }
  //   }
  // };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "AddedOn", dataIndex: "addedOn", key: "addedOn" },
    { title: "Deadline", dataIndex: "deadLine", key: "deadLine" },
    {
      title: "Actions",
      key: "actions",
      render: (cellValue, rowObject, rowIndex) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              deleteTodos(rowObject?._id);
            }}
          >
            Delete
            {/* {JSON.stringify(rowObject)} */}
          </Button>
          <Button
            type="primary"
            // onClick={() => handleEdit(record.id)}
            onClick={() => {
              props.onEditClick(rowObject);
            }}
            style={{ marginLeft: "8px" }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2>Customer List</h2>
      <Input
        className="search-input"
        name="search"
        autoComplete="true"
        placeholder="Search by customer id, name"
        type="text"
        value={params.search}
        onChange={handleSearchChange}
        // onKeyPress={handleKeyPress}
      />

      <Table
        columns={columns}
        dataSource={customers}
        pagination={{
          total: customerCount,
          onChange: (page, limit) => {
            setParams({ ...params, page, limit });
          },

          pageSize: params.limit,
          pageSizeOptions: [5, 10, 20],
          showSizeChanger: true,
        }}
        style={{
          width: "100%",
          overflowX: "auto",
        }}
        rowKey="id"
      />
    </div>
  );
};

export default CustomerList;
