import React, { useState } from "react";
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
      <form onSubmit={login}>
        <div className="login-form">
          <input
            name="email"
            required
            autoComplete={"true"}
            placeholder="Email"
            type="email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />{" "}
          <input
            name="password"
            required
            autoComplete={"true"}
            placeholder="Password"
            type="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>

        <div className="login-create-forgot">
          <a href="/registration">Create Account</a> {""}
          <a href="/forgotPassword">Forgot Password?</a>
        </div>

        <button type="submit" className="login-submit-button">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
