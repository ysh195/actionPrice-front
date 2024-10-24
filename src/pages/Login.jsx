/* eslint-disable react/prop-types */
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
  Checkbox,
  FormControlLabel,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
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
      console.log(result);
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
        text: "입력된 정보가 올바르지 않습니다. 다시 시도해 주세요.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ p: 3, borderRadius: "16px", boxShadow: 3 }}>
        <Typography variant="h5" align="center" color="#49557e">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="사용자 이름"
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
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </IconButton>
              ),
            }}
          />

          {/* Remember Me Checkbox */}
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                color="primary"
              />
            }
            label="Remember me"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#C5705D", height: "3rem" }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <div style={{ textAlign: "center", marginTop: "16px" }}>
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
