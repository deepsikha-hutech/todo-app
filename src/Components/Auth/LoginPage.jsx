import React, { useState } from "react";
import "./loginPage.css";

function LoginPage() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  function login(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    console.log(formProps);
    alert("login success");
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
