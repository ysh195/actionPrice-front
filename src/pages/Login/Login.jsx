import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Cookies from "js-cookie";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState();

  const navigate = useNavigate();

  const onLoginButtonClick = async (e) => {
    e.preventDefault(); // Prevent default form submission

    const formData = {
      username,
      password,
    };

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        formData
      );
      // Set Authorization header
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.payload.access_token}`;

      console.log(response);
      console.log(response.data);

      localStorage.setItem("access_token", response.data.payload.access_token);
      localStorage.setItem(
        "refresh_token",
        response.data.payload.refresh_token
      );

      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Optionally handle the error, e.g., show a notification or set an error state
      alert("Login failed. Please check your credentials.");
    }
  };

  useEffect(() => {
    // 쿠키에서 저장된 아이디 가져오기
    const rememberId = Cookies.get("rememberId");
    console.log(`쿠키 rememberId : ${rememberId}`);
    setRememberMe(rememberId);
  }, []);

  return (
    <div className="form">
      <h2 className="login-title">Login</h2>

      <form id="userLoginForm" className="login-form">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="password"
            autoComplete="current-password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-check">
          <label className="toggle-btn">
            {!rememberMe ? (
              <input
                type="checkbox"
                id="remember-id"
                name="rememberId"
                value="0"
              />
            ) : (
              <input
                type="checkbox"
                id="remember-id"
                name="rememberId"
                value="0"
                defaultChecked
              />
            )}
            <span className="slider"></span>
          </label>
          <label htmlFor="remember-id" className="check-label">
            아이디 저장
          </label>
        </div>

        <button
          className="btn btn--form btn-login"
          type="submit"
          onClick={onLoginButtonClick}
        >
          로그인
        </button>
        <p className="have-account">
          계정이 없으신가요?
          <Link className="move-link" to="/user/register">
            회원가입 하세요
          </Link>
        </p>
      </form>
    </div>
  );
}
