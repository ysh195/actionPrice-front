/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {
  checkUsername,
  sendVerificationCode,
  verifyCode,
} from "../redux/slices/verificationSlice";
import { clearMessages, registerUser } from "../redux/slices/registerSlice";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",

  borderRadius: "20px",
}));

const SignUpContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5", // Optional: set a background color
      }}
    >
      {children}
    </Box>
  );
};

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightGray",
      borderRadius: "15px",
    },
    "&.Mui-focused fieldset": {
      borderColor: "tomato",
    },
  },
}));

export default function Register() {
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [verificationCodeError, setVerificationCodeError] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [verificationCode, setVerificationCode] = React.useState("");
  const [isCodeSent, setIsCodeSent] = React.useState(false);
  const [isCodeVerified, setIsCodeVerified] = React.useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = React.useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = React.useState(false);

  const [touched, setTouched] = React.useState({
    username: false,
    password: false,
    email: false,
    verificationCode: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, emailSuccessMessage, emailFailMessage } = useSelector(
    (state) => state.verification
  );

  const formData = { username, password, email, verificationCode };
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevent space from being entered
    }
  };
  // Update handleInputChange to mark field as touched
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    switch (name) {
      case "username":
        setUsername(value);
        setUsernameError("");
        break;

      case "password":
        setPassword(value);
        setPasswordError(
          value.length < 8 ? "Password must be at least 8 characters long." : ""
        );

        break;
      case "email":
        setEmail(value);
        setEmailError(
          !/\S+@\S+\.\S+/.test(value)
            ? "Please enter a valid email address."
            : ""
        );
        break;
      case "verificationCode":
        setVerificationCode(value);
        setVerificationCodeError(
          isCodeSent && !value ? "Verification Code is required." : ""
        );
        break;
      default:
        break;
    }
    dispatch(clearMessages());
  };

  const handleCheckUsername = async (e) => {
    if (e.relatedTarget && e.relatedTarget.closest("a")) return;

    setIsCheckingUsername(true); // Start checking
    if (username.length < 6) {
      setUsernameError("Username must be at least 6 characters long.");
      setIsCheckingUsername(false); // Stop checking
      return;
    }
    try {
      const response = await dispatch(checkUsername({ username })).unwrap();
      console.log("response:", response);
      if (response === "Username is available") {
        setIsUsernameAvailable(true); // Set username as available
        setUsernameError(""); // Clear error if valid
      } else {
        setUsernameError(response);
        setIsUsernameAvailable(false); // Set username as not available
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameError("Username already exists. Please choose another one.");
      setIsUsernameAvailable(false); // Set username as not available
    } finally {
      setIsCheckingUsername(false); // Stop checking
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (usernameError || emailError || passwordError) return;

    try {
      const sendCodeResult = await dispatch(
        sendVerificationCode(formData)
      ).unwrap();
      setIsCodeSent(true);
      console.log("handleSendCode", sendCodeResult);

      Swal.fire({
        title: sendCodeResult,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error sending verification code:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Failed to send verification code.",
        showConfirmButton: true,
        // timer: 2000,
      });
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!verificationCode) {
      setVerificationCodeError("Verification Code is required.");
      return;
    }

    try {
      const verifyCodeResult = await dispatch(verifyCode(formData)).unwrap();
      if (verifyCodeResult === "인증이 성공했습니다.") {
        setIsCodeVerified(true);
        Swal.fire(verifyCodeResult);
      } else {
        setIsCodeVerified(false);
        Swal.fire(verifyCodeResult);
        console.log("verifyCodeResult:", verifyCodeResult);
        // ("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Verification code error:", error);
      setIsCodeVerified(false);
      Swal.fire(error || "Invalid verification code. Please try again.");
    } finally {
      setVerificationCodeError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      usernameError ||
      emailError ||
      passwordError ||
      verificationCodeError ||
      !isCodeVerified
    )
      return;

    const formData = {
      username,
      email,
      password,
      verificationCode,
    };

    console.log("Form Data being sent:", formData); // Log formData

    try {
      const result = await dispatch(registerUser(formData)).unwrap();
      console.log("Registration result:", result); // Log the result
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/api/user/login");
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire(
        "Error",
        error.message || "Registration failed. Please try again.",
        "error"
      );
    }
  };

  return (
    <SignUpContainer
      sx={{ flexDirection: "column", justifyContent: "space-between" }}
    >
      <Card variant="outlined">
        <Typography
          component="h1"
          variant="h4"
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            color: "#49557e",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          {/* Username Input */}
          <FormControl>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CustomTextField
                id="username"
                name="username"
                placeholder="유저네임 입력하세요"
                value={username}
                autoFocus
                required
                fullWidth
                onKeyDown={handleKeyDown}
                variant="outlined"
                onBlur={handleCheckUsername}
                onChange={handleInputChange}
                color={usernameError ? "error" : "primary"}
              />
              <HowToRegIcon
                onClick={handleCheckUsername}
                sx={{ cursor: "pointer", marginLeft: 1 }}
              />
            </Box>

            {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
            {!usernameError && isUsernameAvailable && (
              <p style={{ color: "green" }}>Username is available!</p>
            )}
          </FormControl>
          {/* Password Input */}
          <FormControl>
            <CustomTextField
              // helperText={passwordError}
              name="password"
              placeholder="페스워드를 입력하세요"
              type="password"
              id="password"
              required
              fullWidth
              onKeyDown={handleKeyDown}
              value={password}
              variant="outlined"
              onChange={handleInputChange}
              color={passwordError ? "error" : "primary"}
            />

            {touched.password && passwordError && (
              <p style={{ color: "red" }}>{passwordError}</p>
            )}
          </FormControl>
          {/* Email Input with Verification Button */}
          <FormControl
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <CustomTextField
              // helperText={emailError}
              name="email"
              placeholder="이메일을 입력하세요"
              type="email"
              id="email"
              required
              fullWidth
              value={email}
              variant="outlined"
              onChange={handleInputChange}
              color={emailError ? "error" : "primary"}
            />

            <Button
              type="button"
              onClick={handleSendCode}
              variant="contained"
              disabled={isLoading || isCodeSent}
              sx={{
                marginLeft: 1,
                backgroundColor: isCodeSent ? "#d3d3d3" : "tomato",
                cursor: isCodeSent ? "not-allowed" : "pointer",
                color: isCodeSent ? "#666" : "#fff",
                borderRadius: "15px",
                height: "56px", // Match the height of the text field
                "&:hover": { backgroundColor: "tomato" },
              }}
            >
              인증코드 보내기
            </Button>
          </FormControl>
          {/* error message */}
          {touched.email && emailError && (
            <p style={{ color: "red" }}>{emailError}</p>
          )}
          {emailSuccessMessage && (
            <p style={{ color: "green" }}>{emailSuccessMessage}</p>
          )}

          {emailFailMessage && (
            <p style={{ color: "red" }}>{emailFailMessage}</p>
          )}

          {/* Loading icon */}

          {isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={26} />
            </Box>
          )}

          {isCodeSent && (
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CustomTextField
                helperText={verificationCodeError}
                name="verificationCode"
                placeholder="인증 코드를 입력하세요"
                type="text"
                id="verificationCode"
                required
                fullWidth
                variant="outlined"
                value={verificationCode}
                onChange={handleInputChange}
                color={verificationCodeError ? "error" : "primary"}
              />
              <Button
                type="button"
                onClick={handleVerifyCode}
                variant="contained"
                disabled={isLoading || isCodeVerified}
                sx={{
                  marginLeft: 1,
                  backgroundColor: isCodeVerified ? "#d3d3d3" : "tomato",
                  cursor: isCodeVerified ? "not-allowed" : "pointer",
                  color: isCodeVerified ? "#666" : "#fff",
                  borderRadius: "15px",
                  height: "56px",
                  "&:hover": { backgroundColor: "tomato" },
                }}
              >
                {isLoading ? "Loading..." : "Verify Code"}
              </Button>
            </FormControl>
          )}
          {isCodeSent && isCodeVerified === true && (
            <Button
              type="submit"
              onClick={handleRegister}
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                backgroundColor: "tomato",
                color: "white",
                borderRadius: "15px",
                height: "50px",
                "&:hover": { backgroundColor: "tomato" },
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          )}
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          계장이 있으신가요?
          <Link
            to="/api/user/login" // Ensure this path matches your route
            variant="body2"
            sx={{
              alignSelf: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            로그인 하세요
          </Link>
        </Typography>

        <Divider>or</Divider>
      </Card>
    </SignUpContainer>
  );
}
