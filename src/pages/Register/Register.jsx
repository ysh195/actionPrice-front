import React, { useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [navigate, setNavigate] = useNavigate(false);

  // const onRegisterButtonClick = async (e) => {
  //   register({ username, email, password })
  //     .then((response) => {
  //       console.log(response);
  //       navigate("/user/login");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  const submit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/user/register", {
      username,
      email,
      password,
    });
  };
  setNavigate(true);

  if (navigate) {
    return <Navigate to="/user/login" />;
  }

  return (
    <div className="form">
      <h2 className="login-title">회원가입</h2>

      <form id="userRegisterForm" className="login-form" onSubmit={submit}>
        <div>
          <input
            type="text"
            id="username"
            autoFocus
            name="username"
            placeholder="username"
            autoComplete="username"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div>
          <input
            type="text"
            id="verification"
            name="verification code"
            placeholder="verification code"
            required
            onChange={(e) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />
        </div>
        <div>
          <button className="btn btn--form btn-login" type="submit">
            회원가입
          </button>
        </div>
        <p className="have-account">
          이미 계정이 있으신가요?
          <Link className="move-link" to="/user/login">
            로그인
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
