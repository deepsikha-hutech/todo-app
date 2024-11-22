//

import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import "./Dashboard.css";
import CustomerList from "./CustomerList";
import AddEditToDo from "./AddEditToDo";
import Cookie from "js-cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import variable from "../../assets/variables";

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState("3");

  const [customerCount, setCustomerCount] = useState(0);

  const [params, setParams] = useState({ page: 1, limit: 10, search: null });
  const [customers, setCustomers] = useState([]);
  const [editCustomer, setEditCustomer] = useState(null);
  const [mode, setMode] = useState("add");
  const navigate = useNavigate();

  const onChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (!Cookie.getItem("accessToken")) {
      navigate("/");
    } else {
      // getTodos();
    }
  }, []);

  async function getTodos() {
    try {
      const token = Cookie.getItem("accessToken");
      // alert(token);

      const { data } = await axios.get(
        `${variable?.TODO_API_URL}/api/v1/todo/getall`,
        { params, headers: { Authorization: token } }
      );
      setCustomers(data?.todo);
    } catch (error) {
      console.log(error);
      alert("something went wrong, try again");
    }
  }

  const handleEditClick = (customer) => {
    setEditCustomer(customer);
    setActiveKey("2");
    setMode("edit");
    // setActiveKey("2");
  };

  const onSaveSuccess = (editCustomer, mode) => {
    // alert("save");
    setActiveKey("3");
  };

  const items = [
    {
      key: "1",
      //customer,onSaveSuccess
      label: "Add",
      children: <AddEditToDo mode="add" onSaveSuccess={onSaveSuccess} />,
    },
    {
      key: "2",
      label: "Edit",
      children: (
        <AddEditToDo
          mode="edit"
          customer={editCustomer}
          onSaveSuccess={onSaveSuccess}
        />
      ),
    },
    {
      key: "3",
      label: "List",
      children: (
        <CustomerList
          customers={customers}
          onEditClick={handleEditClick}
          // onDeleteClick={deleteTodos}
          // handleDelete={onDeleteSuccess}
        />
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
