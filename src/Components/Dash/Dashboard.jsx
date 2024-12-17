//

import React, { useState, useEffect } from "react";
import { Tabs, Button } from "antd";
import "./Dashboard.css";
import TodoList from "./TodoList";
import AddEditToDo from "./AddEditToDo";
import Cookie from "js-cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import variable from "../../assets/variables";

const Dashboard = () => {
  const [activeKey, setActiveKey] = useState("3");

  const [todoCount, setTodoCount] = useState(0);

  const [params, setParams] = useState({ page: 1, limit: 10, search: null });
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [mode, setMode] = useState("add");
  const navigate = useNavigate();

  const onChange = (key) => {
    setActiveKey(key);
  };

  useEffect(() => {
    if (!Cookie.getItem("accessToken")) {
      navigate("/");
    } else {
      getTodos();
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
      setTodos(data?.todo);
    } catch (error) {
      console.log(error);
      alert("something went wrong, try again");
    }
  }

  const handleEditClick = (todo) => {
    // console.log("Editing this todo:", todo);
    setEditTodo(todo);
    setActiveKey("2");
    setMode("edit");
    // setActiveKey("2");
  };

  const onSaveSuccess = (editTodo, mode) => {
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
          todo={editTodo}
          onSaveSuccess={onSaveSuccess}
        />
      ),
    },
    {
      key: "3",
      label: "List",
      children: (
        <TodoList
          todos={todos}
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
      {/* {addGapReason && <Reasons activeKey={activeKey} items={items} onChange={onChange} />} */}
    </div>
  );
};

export default Dashboard;
