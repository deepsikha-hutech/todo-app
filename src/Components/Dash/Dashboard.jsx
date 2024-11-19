//

import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import "./Dashboard.css";
import CustomerList from "./CustomerList";
import AddEditToDo from "./AddEditToDo";
import Cookie from "js-cookies";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState("3");
  const [customers, setCustomers] = useState([
    {
      title: "todo Task",
      description: "Description of the todo",
      addedOn: "11-13-2024",
      deadline: "11-15-2024",
      id: 1,
    },
  ]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [mode, setMode] = useState("add");
  const navigate = useNavigate();

  const onChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (!Cookie.getItem("accessToken")) {
      navigate("/");
    }
  }, []);

  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    alert("edited");
    setActiveKey("2");
    setMode("edit");
    // setActiveKey("2");
  };

  const onSaveSuccess = (editCustomer) => {
    alert("save");
    setActiveKey("2");
  };

  const handleEdit = (id) => {
    alert("Edited");
    onEditClick();
    setActiveKey("2");
  };

  const handleSubmit = () => {
    alert("saved");
    setCustomers([]);
  };

  const items = [
    {
      key: "1",
      //customer,onSaveSuccess
      label: "Add",
      children: <AddEditToDo mode="add" onAddCustomerSuccess={onSaveSuccess} />,
    },
    {
      key: "2",
      label: "Edit",
      children: (
        <AddEditToDo
          mode="edit"
          customer={editCustomer}
          onEditCustomerSuccess={onSaveSuccess}
        />
      ),
    },
    {
      key: "3",
      label: "List",
      children: (
        <CustomerList customers={customers} onEditClick={handleEditClick} />
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <Tabs activeKey={activeKey} items={items} onChange={onChange} />
    </div>
  );
};

export default Dashboard;
