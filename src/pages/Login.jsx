/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.login);

  const validateInputs = () => {
    const newErrors = { username: "", password: "" };
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = { username, password, rememberMe };
    try {
      const result = await dispatch(login(formData)).unwrap();

      // Set a cookie for "Remember Me"
      if (rememberMe) {
        console.log("Setting access token in local storage");
        localStorage.setItem("access_token", result.access_token);
      } else {
        console.log("Setting access token in session storage");
        sessionStorage.setItem("access_token", result.access_token);
      }

      Swal.fire({
        title: "Signed in successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "입력한 정보가 올바르지 않습니다. 다시 시도해 주세요.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Card
        className="p-5"
        style={{
          maxWidth: "450px",
          width: "100%",
          borderRadius: "20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Title
          className="text-center"
          style={{ fontSize: "2rem", color: "#49557e" }}
        >
          Login
        </Card.Title>
        <Form onSubmit={handleLogin}>
          {/* Username Input */}
          <Form.Group className="mb-3 mt-3">
            <Form.Control
              type="text"
              placeholder="유저네임 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={!!errors.username}
              style={{ height: "3rem" }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-3">
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="페스워드를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errors.password}
                style={{ height: "3rem" }}
              />
              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer", borderRadius: "0 5px 5px 0" }}
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>

          {/* Remember Me Checkbox */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Remember me"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </Form.Group>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-100"
            disabled={isLoading}
            style={{
              backgroundColor: "#C5705D",
              color: "white",
              height: "3rem",
              border: "none",
            }}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Login"}
          </Button>
        </Form>
        <div className="text-center mt-3">
          계정이 없으신가요?
          <Link to="/api/user/register" style={{ color: "#CB6040" }}>
            해원가입 하세요
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
