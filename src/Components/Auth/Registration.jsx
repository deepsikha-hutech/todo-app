//

import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import "./registration.css";
import axios from "axios";
import variable from "../../assets/variables";

function Registration() {
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${variable?.TODO_API_URL}/api/v1/auth/signup`,
        loginData
      );

      console.log({ data });
      if (data?.user) {
        location.href = "http://localhost:5173/login";
      } else {
        alert("Signup Failed, try again");
      }
    } catch (error) {
      console.log(error);
      alert("Signup Failed, try again");
    }
  };

  return (
    <div className="signup">
      <h2>Registration</h2>
      <Form onFinish={handleSubmit} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input
            placeholder="Name"
            value={loginData.name}
            onChange={(e) =>
              setLoginData({ ...loginData, name: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Select
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "female",
                label: "female",
              },
              {
                value: "male",
                label: "male",
              },
              {
                value: "others",
                label: "others",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Form.Item>

        <div className="login">
          Already have an account? <a href="/login">Login</a>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Registration;
