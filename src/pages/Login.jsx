/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

const SignInContainer = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        // backgroundColor: "#f5f5f5", // Optional: set a background color
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

export default function Login() {
  const [usernameError, setUsernameError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.login);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "password") setPassword(value);
  };

  const validateInputs = () => {
    let isValid = true;
    setUsernameError("");
    setPasswordError("");

    if (!username) {
      setUsernameError("Username is required");
      isValid = false;
    }
    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const formData = { username, password };

    try {
      await dispatch(login(formData)).unwrap();
      Swal.fire({
        title: "Signed in successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "로그인에 실패했습니다! 정보를 확인하세요.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        {/* login title */}
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
          Login
        </Typography>
        {/* login input box */}
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 4,
          }}
        >
          <FormControl>
            <CustomTextField
              error={Boolean(usernameError)}
              helperText={usernameError}
              id="username"
              type="text"
              name="username"
              placeholder="유저네임 입력하세요"
              autoFocus
              required
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              color={usernameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <CustomTextField
              error={Boolean(passwordError)}
              helperText={passwordError}
              name="password"
              placeholder="페스워드를 입력하세요"
              type={showPassword ? "text" : "password"}
              id="password"
              required
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ marginRight: 1 }}
                    >
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
              backgroundColor: "#E85A4F",
              color: "white",
              borderRadius: "15px",
              height: "50px",
              "&:hover": { backgroundColor: "#0D7C66" },
            }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Typography sx={{ textAlign: "center" }}>
          계장이 없으신가요?
          <Link
            to="/api/user/register"
            variant="body2"
            sx={{
              alignSelf: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            해원가입 하세요
          </Link>
        </Typography>

        <Divider>or</Divider>
      </Card>
    </SignInContainer>
  );
}
