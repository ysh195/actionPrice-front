import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoading, isError, errorMessage, isLoggedIn, refresh_token } =
    useSelector((state) => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value); // Update username
    } else if (name === "password") {
      setPassword(value); // Update password
    }
  };

  const handleToggle = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = { username, password };

    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log("Login result:", result);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="form">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleLogin} id="userLoginForm" className="auth-form">
        <div>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            value={username}
            onChange={handleInputChange}
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
            value={password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleToggle}
            className="check-label"
          />
          아이디 저장
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn--form btn-login"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        {isError && <p style={{ color: "red" }}>{errorMessage}</p>}
        <p className="have-account">
          계정이 없으신가요?
          <Link className="move-link" to="/api/user/register">
            회원가입 하세요
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
