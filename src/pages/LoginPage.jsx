/* eslint-disable no-unused-vars */
 
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Container,
  Card,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { colors } from "../assets/assest";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.login);

  const validateInputs = () => {
    const newErrors = { username: "", password: "" };
    if (!username) newErrors.username = "시용자 이름은 필수입니다.";
    if (!password) newErrors.password = "비밀번호는 필수입니다";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const formData = { username, password };
    try {
      const result = await dispatch(login(formData)).unwrap();
      console.log("login result", result);
      localStorage.setItem("access_token", result.access_token);
      localStorage.setItem("username", result.username);

      Swal.fire({
        text: "성공적으로 로그인되었습니다!",
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
        text: error,
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
          로그인
        </Typography>
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="사용자명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errors.username}
            helperText={errors.username}
          />

          {/* Password Input */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
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
              ),
            }}
          />
          <Link
            to="/api/user/changePassword"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              color: colors.button2,
              fontSize: "0.875rem",
              textDecoration: "none",
              marginTop: 2,
            }}
          >
            비밀번호 찾기
          </Link>

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, backgroundColor: colors.tableHead, height: "3rem" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            mt: 3,
            ml: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              계정이 없으신가요?
            </Typography>
            <Link
              to="/api/user/register"
              style={{
                color: colors.button2,
                fontSize: "0.8rem",
                textDecoration: "none",
                marginTop: "3px",
              }}
            >
              회원가입
            </Link>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};

export default LoginPage;
