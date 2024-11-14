/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import {
  Container,
  Card,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { colors } from "../../assets/assest.js";
import { verifyCode } from "../../redux/slices/verificationSlice";
import {
  checkUserExists,
  sendVerificationCodeForChangingPW,
  changePassword,
} from "../../redux/slices/PwChangeSlice";

const PwChange = () => {
  const [errors, setErrors] = useState({});
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userExists,
    loading,
    userVerificationStatus,
    userVerificationMessage,
    passwordChangeStatus,
    passwordChangeMessage,
  } = useSelector((state) => state.pwChange);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  });

  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault();
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
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{8,16}$/;

    switch (name) {
      case "username":
        error = !value ? "사용자명은 필수입니다." : "";
        break;
      case "password":
        error = !passwordRegex.test(value)
          ? "비밀번호는 8~16자로 구성되며, 영어, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다."
          : "";
        break;
      case "verificationCode":
        error = isCodeSent && !value ? "인증코드는 필수입니다." : "";
        break;
      default:
        break;
    }
    return error;
  };

  const handleCheckUserExist = async () => {
    const { username } = formData;
    if (validateInput("username", username)) return;

    try {
      await dispatch(checkUserExists({ username })).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendCodeforPw = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      Swal.fire({
        icon: "error",
        text: "인증 코드를 전송하기 전에 오류를 수정해 주세요.",
      });
      return;
    }
    try {
      const result = await dispatch(
        sendVerificationCodeForChangingPW(formData)
      ).unwrap();
      setIsCodeSent(true);
      Swal.fire({ text: result, icon: "success", timer: 2000 });
    } catch (error) {
      Swal.fire({
        title: "없는 사용자 입니다.",
        icon: "error",
        text: error,
      });
    }
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
      setIsCodeVerified(verifyCodeResult === "인증이 성공했습니다.");
      Swal.fire({ text: verifyCodeResult });
    } catch (error) {
      setIsCodeVerified(false);
      Swal.fire({
        icon: "error",
        text: "유효하지 않은 인증 코드입니다. 다시 시도해 주세요.",
      });
    }
  };

  const handleChangePw = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) return;

    try {
      await dispatch(changePassword(formData)).unwrap();
      Swal.fire({
        icon: "success",
        text: "비밀번호가 성공적으로 변경되었습니다.",
        timer: 2000,
      });
      navigate("/api/user/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: "비밀번호 변경에 실패했습니다. 다시 시도해 주세요.",
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
          비밀번호 변경
        </Typography>
        <form onSubmit={handleChangePw}>
          {/* Username Input */}
          <TextField
            fullWidth
            margin="normal"
            variant="outlined"
            label="사용자명"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            onBlur={handleCheckUserExist}
            error={!!errors.username}
            helperText={errors.username}
            onKeyDown={handleKeyDown}
          />

          {/* Email Input */}
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
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="contained"
              onClick={handleSendCodeforPw}
              disabled={
                loading || isCodeSent || !formData.email || !formData.username
              }
              sx={{
                height: "3rem",
                ml: 1,
                bgcolor: isCodeSent ? colors.disable : colors.tableHead,
                color: isCodeSent ? "#666" : "white",
              }}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: "-12px",
                    marginTop: "-12px",
                  }}
                />
              ) : (
                "코드 발송"
              )}
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
                disabled={loading || isCodeVerified}
                sx={{
                  height: "3rem",
                  ml: 1,
                  bgcolor: colors.tableHead,
                  color: "white",
                }}
              >
                {loading ? <CircularProgress size={24} /> : "코드 인증"}
              </Button>
            </Box>
          )}
          {/* Password Input */}
          {isCodeVerified && (
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              label="새 비밀번호"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              onKeyDown={handleKeyDown}
              onBlur={() => validateInput("password", formData.password)}
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
          )}
          {/* Submit Button */}
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
              {loading ? <CircularProgress size={24} /> : "비밀번호 변경"}
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
            계정이 있으신가요?{" "}
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

export default PwChange;
