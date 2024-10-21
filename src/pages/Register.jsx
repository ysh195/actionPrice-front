/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, clearMessages } from "../redux/slices/registerSlice";
import {
  checkUsername,
  sendVerificationCode,
  verifyCode,
} from "../redux/slices/verificationSlice";
import Swal from "sweetalert2";
import { Container, Card, Form, Button, Spinner } from "react-bootstrap";
import { BsCheck2All } from "react-icons/bs";


const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  });
  const [errors, setErrors] = useState({});
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.verification);

  //prevent users to type blank space
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from being entered
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateInput(name, value); // Capture the error
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error })); // Set error state
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error
      dispatch(clearMessages());
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        //todo: will user be able to use korean alphabet, or only number?
        error =
          value.length < 6
            ? "Username must be at least 6 characters long."
            : "";
        break;
      case "password":
        //todo: will user be able to use only number?

        error =
          value.length < 8
            ? "Password must be at least 8 characters long."
            : "";
        break;
      case "email":
        error = !/\S+@\S+\.\S+/.test(value)
          ? "Please enter a valid email address."
          : "";
        break;
      case "verificationCode":
        error = isCodeSent && !value ? "Verification Code is required." : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  //function:      handleCheckUsername       //
  const handleCheckUsername = async () => {
    const { username } = formData;
    if (validateInput("username", username)) return;

    try {
      await dispatch(checkUsername({ username })).unwrap();
      setIsUsernameAvailable(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        username: "Username already exists. Please choose another one.",
      }));
    }
  };
  //function:      handleSendCode       //
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please fix the errors in the form before sending the verification code.",
        showConfirmButton: true,
      });
    // Stop execution if there are errors
    }

    try {
      const sendCodeResult = await dispatch(
        sendVerificationCode(formData)
      ).unwrap();
      setIsCodeSent(true);
      Swal.fire({ text: sendCodeResult, icon: "success", timer: 2000 });
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        text: error || "Failed to send verification code.",
        showConfirmButton: true,
      });
    }
  };
  //function:      handleVerifyCode       //
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "Verification Code is required.",
      }));
      return;
    }
    try {
      const verifyCodeResult = await dispatch(verifyCode(formData)).unwrap();
      setIsCodeVerified(verifyCodeResult === "인증이 성공했습니다.");
      Swal.fire(verifyCodeResult);
    } catch (error) {
      setIsCodeVerified(false);
      Swal.fire({
        icon: "error",
        text: "Invalid verification code. Please try again.",
        showConfirmButton: true,
      });
    }
  };
  //function:      handleRegister       //
  const handleRegister = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) return;

    try {
      await dispatch(registerUser(formData)).unwrap();
      Swal.fire({
        icon: "success",
        text: "Registered successfully!",
        timer: 2000,
      });
      navigate("/api/user/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Registration failed. Please try again.",
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
          Register
        </Card.Title>
        <Form onSubmit={handleRegister}>
          {/* Username Input */}
          <Form.Group className="mb-3 mt-3 position-relative">
            <Form.Control
              type="text"
              placeholder="유저네임 입력하세요"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              onBlur={handleCheckUsername}
              isInvalid={!!errors.username}
              onKeyDown={handleKeyDown}
              style={{ height: "3rem" }}
            />
            {isUsernameAvailable && !errors.username ? (
              <BsCheck2All
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "green",
                }}
              />
            ) : (
              ""
            )}
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Password Input */}
          <Form.Group className="mb-3 position-relative">
            <Form.Control
              type="password"
              placeholder="페스워드를 입력하세요"
              name="password"
              onKeyDown={handleKeyDown}
              value={formData.password}
              onChange={handleInputChange}
              onBlur={() => validateInput("password", formData.password)}
              isInvalid={!!errors.password}
              style={{ height: "3rem" }}
            />
            {!errors.password && formData.password && (
              <BsCheck2All
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "green",
                }}
              />
            )}
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email Input with Verification Button */}
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center">
              <Form.Control
                type="email"
                placeholder="이메일을 입력하세요"
                name="email"
                onKeyDown={handleKeyDown}
                value={formData.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
                style={{ height: "3rem" }}
              />
              <Button
                type="button"
                onClick={handleSendCode}
                disabled={
                  isLoading ||
                  isCodeSent ||
                  !formData.email ||
                  !formData.username
                }
                className="ms-2"
                variant="primary"
                style={{
                  backgroundColor: isCodeSent ? "#d3d3d3" : "#C5705D",
                  cursor: isCodeSent ? "not-allowed" : "pointer",
                  color: isCodeSent ? "#666" : "#fff",
                  borderRadius: "5px",
                  height: "3rem",
                  fontSize: "0.875rem",
                  fontWeight: "bold",
                  lineHeight: "1.25",
                  border: "none",
                  "&:hover": { backgroundColor: "#CB6040" },
                }}
              >
                코드발성
              </Button>
            </div>
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Verification Code Input */}
          {isCodeSent && (
            <Form.Group className="mb-3">
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  isInvalid={!!errors.verificationCode}
                  onKeyDown={handleKeyDown}
                  style={{ height: "3rem" }}
                />
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  disabled={isLoading || isCodeVerified}
                  className="ms-2"
                  variant="success"
                  style={{
                    backgroundColor: "#C5705D",
                    cursor: "pointer",
                    borderRadius: "5px",
                    height: "3rem",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                    lineHeight: "1.25",
                    border: "none",
                    "&:hover": { backgroundColor: "#CB6040" },
                  }}
                >
                  {isLoading ? "Loading..." : "코드 인증"}
                </Button>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.verificationCode}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {/* Register Button */}
          {isCodeVerified && (
            <Button
              type="submit"
              variant="success"
              disabled={isLoading}
              className="w-100 mb-3"
              style={{
                backgroundColor: "#C5705D",
                color: "white",
                border: "none",
                borderRadius: "10px",
                height: "3rem",
                "&:hover": { backgroundColor: "#CB6040" },
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          )}
        </Form>
        <div className="text-center mt-3">
          계장이 있으신가요?{" "}
          <Link to="/api/user/login" style={{ color: "#CB6040" }}>
            로그인 하세요
          </Link>
        </div>
      </Card>
    </Container>
  );
};

export default Register;
