import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./loginPage.css";
import axios from "axios";
import variable from "../../assets/variables";
import Cookies from "js-cookies";

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  async function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      const { data } = await axios.post(
        `${variable?.TODO_API_URL}/api/v1/auth/signin`,
        { email, password }
      );

      if (data?.token) {
        Cookies.setItem("accessToken", data?.token, { expires: "7d" });
        location.href = "http://localhost:5173/dashboard";
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid credentials.");
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <Form
        className="login-form"
        name="loginForm"
        layout="vertical"
        onFinish={(values) => {
          const formElement = document.querySelector("form");
          if (formElement) {
            formElement.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            );
          }
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input
            name="email"
            placeholder="Email"
            autoComplete="true"
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
            name="password"
            placeholder="Password"
            autoComplete="true"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </Form.Item>

        <div className="login-create-forgot">
          <a href="/registration">Create Account</a> {""}
          <a href="/forgotPassword">Forgot Password?</a>
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-submit-button"
            block
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      <Form style={{ display: "none" }} onSubmit={login}>
        <Input name="email" value={loginData.email} />
        <Input name="password" value={loginData.password} />
      </Form>
    </div>
  );
}

export default LoginPage;
