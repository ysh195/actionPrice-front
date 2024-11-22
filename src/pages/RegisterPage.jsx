/* eslint-disable no-unused-vars */
 
import React, { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Container,
  Card,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { colors } from "../assets/assest";
import { axiosPublic } from "../redux/apiConfig";

const verifyCode = createAsyncThunk(
  "auth/verifyCode",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/checkVerificationCode`,
        formData
      );
      console.log("verifyCode:", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "유효하지 않은 인증 코드입니다. 다시 시도해 주세요."
      );
    }
  }
);

export const sendVerificationCode = createAsyncThunk(
  "auth/sendVerificationCode",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/sendVerificationCode`,
        formData
      );
      console.log("sendVerificationCode:", response);
      return response.data; //인증코드가 성공적으로 발송되었습니다.
    } catch (error) {
      console.log("send Verification error:", error);
      const errorCode = error.response?.status; // Get the error status code
      let errorMessage;
      if (errorCode === 409) {
        errorMessage = "해당 이메일은 이미 사용 중입니다.";
      } else if (errorCode === 400) {
        errorMessage = "해당 이메일은 존재하지 않습니다.";
      } else {
        errorMessage =
          error.response?.data ||
          "인증 코드를 전송하는 중 오류가 발생했습니다.";
      }

      return rejectWithValue(errorMessage);
    }
  }
);

const checkUsername = createAsyncThunk(
  "auth/checkUsername",
  async ({ username }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        `/user/checkForDuplicateUsername`,
        {
          username,
        }
      );
      console.log("Slice check Username:", response.data);

      return response.data; //"Username is available";
    } catch (error) {
      console.error("Slice Error response:", error.response);
      return rejectWithValue(
        error.response?.data || "오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }
);

const registerUser = createAsyncThunk(
  "auth/register",

  async (formData, { rejectWithValue }) => {
    console.log("Slice formData:", formData);
    try {
      // console.log("Payload sent to API:", {formData});

      const response = await axiosPublic.post(`/user/register`, formData);
      console.log("Registration successful:", response.data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      return rejectWithValue(
        error.response?.data ||
          error.message ||
          "오류가 발생했습니다. 다시 시도해 주세요."
      );
    }
  }
);


const RegisterPage = () => {
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
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from being entered
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateInput(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    const usernameRegex = /^[a-zA-Z0-9]{6,20}$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,16}$/;
    const emailRegex = /\S+@\S+\.\S+/;
    switch (name) {
      case "username":
        error = !usernameRegex.test(value)
          ? "사용자명은 6~20자의 영어와 숫자로 구성됩니다."
          : "";
        break;
      case "password":
        error = !passwordRegex.test(value)
          ? "비밀번호는 8~16자로 구성되며, 영어, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."
          : "";
        break;
      case "email":
        error = !emailRegex.test(value)
          ? "유효한 이메일 주소를 입력하세요."
          : "";
        break;
      case "verificationCode":
        error = isCodeSent && !value ? "인증코드는 필수입니다." : "";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleCheckUsername = async () => {
    const { username } = formData;
    if (validateInput("username", username)) return;

    try {
      await dispatch(checkUsername({ username })).unwrap();
      setIsUsernameAvailable(true);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        username: "사용자명이 이미 존재합니다. 다른 이름을 선택해 주세요.",
      }));
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        text: "인증 코드를 전송하기 전에 오류를 수정해 주세요.",
        showConfirmButton: true,
      });
      return;
    }

    setIsLoading(true);

    Swal.fire({
      title: "잠시 기다려 주세요...",
      text: "인증 코드가 전송 중이며 최대 30초가 걸릴 수 있습니다.",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    try {
      const sendCodeResult = await dispatch(
        sendVerificationCode(formData)
      ).unwrap();
      setIsCodeSent(true);
      Swal.fire({
        icon: "success",
        text: sendCodeResult,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error,
        showConfirmButton: true,
      });
    }

    setIsLoading(false);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!formData.verificationCode) {
      setErrors((prev) => ({
        ...prev,
        verificationCode: "인증 코드가 필수입니다.",
      }));
      return;
    }
    try {
      const verifyCodeResult = await dispatch(verifyCode(formData)).unwrap();
      console.log(verifyCodeResult);

      setIsCodeVerified(verifyCodeResult === "인증이 성공했습니다.");
      Swal.fire({
        text: verifyCodeResult,
        icon: (verifyCodeResult === "인증이 성공했습니다.") ? "success" : "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      setIsCodeVerified(false);
      Swal.fire({
        icon: "error",
        text: "유효하지 않은 인증 코드입니다. 다시 시도해 주세요.",
        showConfirmButton: true,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) return;

    try {
      await dispatch(registerUser(formData)).unwrap();
      Swal.fire({
        icon: "success",
        text: "회원가입이 성공적으로 완료되었습니다",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/api/user/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "회원가입에 실패했습니다. 다시 시도해 주세요.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ p: 5, borderRadius: 4, boxShadow: 3 }}>
        <Typography
          variant="h5"
          align="center"
          sx={{ color: colors.hover1, mb: 1 }}
        >
          회원가입
        </Typography>
        <form onSubmit={handleRegister}>
          {/* Username Input */}

          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="사용자명"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleCheckUsername}
            error={!!errors.username}
            helperText={errors.username}
            onKeyDown={handleKeyDown}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    isUsernameAvailable && !errors.username ? "green" : "", // Green border when valid
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    isUsernameAvailable && !errors.username ? "green" : "", // Green border on focus
                },
                "&:hover fieldset": {
                  borderColor:
                    isUsernameAvailable && !errors.username ? "green" : "", // Green border on hover when valid
                },
              },
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="비밀번호"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password}
            onBlur={() => validateInput("password", formData.password)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </Box>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor:
                    formData.password && !errors.password ? "green" : "", // Green border when valid
                },
                "&.Mui-focused fieldset": {
                  borderColor:
                    formData.password && !errors.password ? "green" : "",
                },
                "&:hover fieldset": {
                  borderColor:
                    formData.password && !errors.password ? "green" : "",
                },
              },
            }}
          />

          {/* Email Input with Verification Button */}
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="이메일"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
              onBlur={() => validateInput("email", formData.email)}
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="contained"
              onClick={handleSendCode}
              disabled={
                isLoading || isCodeSent || !formData.email || !formData.username
              }
              sx={{
                height: "3rem",
                ml: 1,
                mt: 1,
                bgcolor: isCodeSent ? colors.disable : colors.tableHead,
                color: isCodeSent ? "#666" : "white",
              }}
            >
              코드 발송
            </Button>
          </Box>

          {/* Verification Code Input */}
          {isCodeSent && (
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                label="인증 코드"
                name="verificationCode"
                value={formData.verificationCode}
                onChange={handleInputChange}
                error={!!errors.verificationCode}
                helperText={errors.verificationCode}
                onKeyDown={handleKeyDown}
                disabled={isCodeVerified}
              />
              <Button
                variant="contained"
                onClick={handleVerifyCode}
                disabled={isLoading || isCodeVerified}
                sx={{
                  height: "3rem",
                  ml: 1,
                  bgcolor: colors.tableHead,
                  color: "white",
                }}
              >
                {isLoading ? <CircularProgress size={24} /> : "코드 인증"}
              </Button>
            </Box>
          )}

          {/* Register Button */}
          {isCodeVerified && (
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: "3rem",
                bgcolor: colors.tableHead,
                color: "white",
                mt: 2,
              }}
            >
              {isLoading ? <CircularProgress size={24} /> : "Register"}
            </Button>
          )}
        </form>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mt: 3,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            계정이 있으신가요?
          </Typography>

          <Link
            to="/api/user/login"
            style={{ color: colors.button2, fontSize: "0.8rem" }}
          >
            로그인
          </Link>
        </Box>
      </Card>
    </Container>
  );
};

export default RegisterPage;
