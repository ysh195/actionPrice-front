
/* eslint-disable react/prop-types */
import * as React from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
  CircularProgress,
  Card
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  checkUsername,
  checkEmailDup,
  sendVerificationCode,
  verifyCode,
} from "../redux/slices/verificationSlice";
import { clearMessages, registerUser } from "../redux/slices/registerSlice";
import DoneAllIcon from "@mui/icons-material/DoneAll";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "450px",
  borderRadius: "20px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
}));

const SignUpContainer = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    {children}
  </Box>
);

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightGray",
      borderRadius: "15px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#CB6040",
    },
  },
}));

export default function Register() {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  });
  const [errors, setErrors] = React.useState({});
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [isCodeVerified, setIsCodeVerified] = React.useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.verification);

  //prevent users to type blank space
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from being entered
    }
  };

  const validateInput = (name, value) => {
    let error = "";
    switch (name) {
      case "username":
        error =
          value.length < 6
            ? "Username must be at least 6 characters long."
            : "";
        break;
      case "password":
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateInput(name, value);
    dispatch(clearMessages());
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

  //function:      handleCheckEmail       //
  const handleCheckEmail = async () => {
    const { email } = formData;
    if (validateInput("email", email)) return;

    try {
      await dispatch(checkEmailDup({ email })).unwrap();
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: "This email is in use. Please choose another one.",
      }));
    }
  };
  const handleSendCode = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) return;

    try {
      const sendCodeResult = await dispatch(
        sendVerificationCode(formData)
      ).unwrap();
      setIsCodeSent(true);
      Swal.fire({ text: sendCodeResult, icon: "success", timer: 2000 });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error || "Failed to send verification code.",
        showConfirmButton: true,
      });
    }
  };

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
        text: "Registered successfully!",
        timer: 2000,
      });
      navigate("/api/user/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <SignUpContainer>
      <StyledCard>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#49557e",
            mb: 2,
          }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Username Input */}
          <FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                name="username"
                placeholder="유저네임 입력하세요"
                value={formData.username}
                onBlur={handleCheckUsername}
                onChange={handleInputChange}
                fullWidth
                onKeyDown={handleKeyDown}
                variant="outlined"
                autoFocus
              />
              {isUsernameAvailable ? (
                <DoneAllIcon sx={{ marginLeft: 1, color: "green" }} />
              ) : (
                ""
              )}
            </Box>
            {errors.username && (
              <span style={{ color: "red" }}>{errors.username}</span>
            )}
          </FormControl>
          {/* Password Input */}
          <FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                name="password"
                placeholder="페스워드를 입력하세요"
                type="password"
                value={formData.password}
                onBlur={() => validateInput("password", formData.password)}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
              />
              {!errors.password && formData.password && (
                <DoneAllIcon style={{ color: "green", marginLeft: 10 }} />
              )}
            </Box>
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </FormControl>
          {/* Email Input with Verification Button */}
          <FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                name="email"
                placeholder="이메일을 입력하세요"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                fullWidth
                variant="outlined"
              />
              <Button
                type="button"
                onClick={handleSendCode}
                variant="contained"
                disabled={isLoading || isCodeSent}
                sx={{
                  marginLeft: 1,
                  backgroundColor: isCodeSent ? "#d3d3d3" : "#C5705D",
                  cursor: isCodeSent ? "not-allowed" : "pointer",
                  color: isCodeSent ? "#666" : "#fff",
                  borderRadius: "15px",
                  height: "56px",

                  "&:hover": { backgroundColor: "#CB6040" },
                }}
              >
                코드발성
              </Button>
            </Box>
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </FormControl>
          {isLoading && (
            <CircularProgress
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            />
          )}
          {isCodeSent && (
            <FormControl>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CustomTextField
                  name="verificationCode"
                  placeholder="인증 코드를 입력하세요"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  variant="outlined"
                />
                <Button
                  type="button"
                  onClick={handleVerifyCode}
                  variant="contained"
                  disabled={isLoading || isCodeVerified}
                  sx={{
                    marginLeft: 1,
                    backgroundColor: "#C5705D",
                    borderRadius: "15px",
                    height: "56px",
                    "&:hover": { backgroundColor: "#CB6040" },
                  }}
                >
                  {isLoading ? "Loading..." : "코드 인증"}
                </Button>
              </Box>
            </FormControl>
          )}
          {isCodeVerified && (
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "#C5705D",
                color: "white",
                borderRadius: "15px",
                height: "50px",
                "&:hover": { backgroundColor: "#CB6040" },
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          )}
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          계장이 있으신가요?
          <Link
            to="/api/user/login"
            sx={{ textDecoration: "none", color: "#CB6040" }}
          >
            로그인 하세요
          </Link>
        </Typography>
        <Divider />
      </StyledCard>
    </SignUpContainer>
  );
}
