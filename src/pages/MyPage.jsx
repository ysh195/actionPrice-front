/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Typography, Paper, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.login.username);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/api/user/login");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>사용자 이름: {username || "Not provided"}</Typography>
            <Typography>이메일: john.doe@example.com</Typography>
          </Box>
        );
      case 1:
        return <Typography>찜한 상품 목록</Typography>; // Add Wishlist content here
      case 2:
        return <Typography>문의 내용들</Typography>; // Add My Posts content here
      case 3:
        return (
          <Box>
            <Typography>로그아웃 하시겠습니까?</Typography>
            <Button
              onClick={handleLogout}
              color="warning"
              variant="outlined"
              sx={{ marginTop: 2 }}
            >
              로그아웃 확인
            </Button>
          </Box>
        );
      case 4:
        return (
          <Box>
            <Typography>계정을 삭제하시겠습니까?</Typography>
            <Button
              onClick={handleLogout}
              color="error"
              variant="outlined"
              sx={{ marginTop: 2 }}
            >
              삭제 확인
            </Button>
          </Box>
        );
      default:
        return <Typography>Select an option from the sidebar.</Typography>;
    }
  };

  return (
    <Paper sx={{ display: "flex", padding: 2, height: "100vh" }}>
      <Box sx={{ width: "200px", borderRight: "1px solid #ddd", padding: 1 }}>
        {[
          "Personal Info",
          "Wishlist",
          "My Posts",
          "Logout",
          "Delete Account",
        ].map((label, index) => (
          <Button
            key={index}
            onClick={() => handleTabChange(index)}
            variant={activeTab === index ? "contained" : "outlined"} // Keep active button filled if needed
            color={activeTab === index ? "primary" : "default"}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              marginBottom: 1,
              textTransform: "none",
              borderColor: activeTab === index ? "#C5705D" : "navy",
              color: activeTab === index ? "white" : "navy",
              backgroundColor: activeTab === index ? "#C5705D" : "transparent",
              "&:hover": {
                backgroundColor:
                  activeTab === index ? "#CB6040" : "rgba(0, 0, 128, 0.1)", 
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 1, padding: 2 }}>{renderContent()}</Box>
    </Paper>
  );
};

export default MyPage;
