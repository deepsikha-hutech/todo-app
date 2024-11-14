//
import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";

const CustomerList = (props) => {
  // const { customers, onEditClick } = props;
  // const [editCustomer, setEditCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);

  const handleDelete = (id) => {
    alert("Deleted");
  };

  useEffect(() => {
    setCustomers(props.customers);
  }, [props]);

  // const handleEdit = (id) => {
  //   alert("Edited");
  //   onEditClick();
  // };

  const handleDeleteAll = () => {
    setCustomer([]);
    alert("All deleted");
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "AddedOn", dataIndex: "addedOn", key: "addedOn" },
    { title: "Deadline", dataIndex: "deadline", key: "deadline" },
    {
      title: "Actions",
      key: "actions",
      render: (cellValue, rowObject, rowIndex) => (
        <div>
          <Button type="primary" onClick={() => handleDelete(rowObject)}>
            Delete
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
      <Button
        type="primary"
        onClick={handleDeleteAll}
        style={{ marginBottom: "16px" }}
      >
        Delete All
      </Button>
      <Table columns={columns} dataSource={customers} rowKey="id" />
    </div>
  );
};

export default CustomerList;
