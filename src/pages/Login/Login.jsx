import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.login);
  const [rememberMe, setRememberMe] = useState(false);

  // Local state for managing form inputs (username and password)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Update form input values
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // Handle login action (when the user submits the form)
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(formData));
    // If Remember Me is checked, save username to local storage
    if (rememberMe) {
      localStorage.setItem("rememberMe", formData.username);
    } else {
      localStorage.removeItem("rememberMe");
    }
    navigate("/");
  };
  const handleToggle = () => {
    setRememberMe(!rememberMe);
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
            value={formData.username}
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
            value={formData.password}
            onChange={handleInputChange}
            required
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
        {error && <p style={{ color: "red" }}>{error}</p>}{" "}
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
