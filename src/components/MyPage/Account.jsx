/* eslint-disable react/prop-types */
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteAccount, getPersonalInfo } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Account = ({ username, email }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("checking username in account:", username)

  useEffect(() => {
    if (username) {
      console.log("username:", username);
      dispatch(getPersonalInfo(username));
      
    }
  }, [dispatch, username]);

  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmation = await Swal.fire({
      title: "계정을 삭제하시겠습니까?",
      text: "삭제된 계정은 복구할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제하기",
      cancelButtonText: "취소",
    });
 
    if (confirmation.isConfirmed) {
      const result = await dispatch(deleteAccount(username));
      if (deleteAccount.fulfilled.match(result)) {
        Swal.fire({
          text: "계정이 성공적으로 삭제되었습니다",
          icon: "success",
          timer: 3000,
        });
        navigate("/api/user/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "계정 삭제에 실패하였습니다. 다시 시도해 주세요.",
          showConfirmButton: true,
        });
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        개인정보
      </Typography>
      <Typography>사용자 이름: {username || "Not provided"}</Typography>
      <Typography>이메일: {email || "Not provided"}</Typography>
      <Button
        onClick={handleDeleteAccount}
        color="error"
        variant="outlined"
        sx={{ marginTop: 2 }}
      >
        계정 삭제하기
      </Button>
    </Box>
  );
};

export default Account;
