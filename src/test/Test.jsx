/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  TextField,
  Typography,
  Card,
  InputAdornment,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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

const SignInContainer = ({ children }) => (
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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ username: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.login);

  const validateInputs = () => {
    const newErrors = { username: "", password: "" };
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    try {
      await dispatch(login({ username, password })).unwrap();
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
        text: error.message || "로그인에 실패했습니다! 정보를 확인하세요.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <SignInContainer>
      <StyledCard>
        <Typography
          component="h1"
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            width: "100%",
            fontSize: "clamp(2rem, 10vw, 2.15rem)",
            color: "#49557e",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Login
        </Typography>
        {/* login input box */}
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <CustomTextField
              error={Boolean(errors.username)}
              helperText={errors.username}
              name="username"
              placeholder="유저네임 입력하세요"
              autoFocus
              fullWidth
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <CustomTextField
              error={Boolean(errors.password)}
              helperText={errors.password}
              name="password"
              placeholder="페스워드를 입력하세요"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityIcon sx={{ color: "#8e8d8a" }} />
                      ) : (
                        <VisibilityOffIcon sx={{ color: "#8e8d8a" }} />
                      )}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Typography align="center">
          계정이 없으신가요?
          <Link
            to="/api/user/register"
            variant="body2"
            sx={{ textDecoration: "none", color: "#CB6040" }}
          >
            해원가입 하세요
          </Link>
        </Typography>
        <Divider>or</Divider>
      </StyledCard>
    </SignInContainer>
  );
}
