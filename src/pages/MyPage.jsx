/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  Pagination,
} from "@mui/material";

import { colors } from "../assets/assest";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/loginSlice";
import {
  useNavigate,
  useParams,
  useSearchParams,
  Routes,
  Route,
} from "react-router-dom";
//import { getMyPosts, getPersonalInfo } from "../redux/slices/userSlice";
import Account from "../components/MyPage/Account";
import Favorites from "../components/MyPage/Favorites";
import MyPosts from "../components/MyPage/MyPosts";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageNum = parseInt(searchParams.get("pageNum")) || 1;

  const { username } = useParams();
  const { myPosts, email } = useSelector((state) => state.user);
  const { favoriteList } = useSelector((state) => state.category);

  // const handleSearch = (searchKeyword) => {
  //   setSearchParams({ pageNum: 1, keyword: searchKeyword }); // Reset to first page and set keyword
  //   dispatch(fetchPosts({ pageNum: 0, keyword: searchKeyword }));
  // };
  // const handleResetSearch = () => {
  //   setSearchParams({ pageNum: 1 }); // Reset to the first page
  // };

  useEffect(() => {
    // Update URL based on the active tab
    const tabPaths = ["/personalinfo", "/wishlist", "/myposts", "/logout"];
    navigate(`/api/mypage/${username}${tabPaths[activeTab]}`);
  }, [activeTab, navigate, username]);

  const handlePageChange = (event, value) => {
    if (value < 1) return;
    setSearchParams({ pageNum: value, keyword });
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/api/user/login");

  };

  return (
    <Paper
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: colors.paperb,
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "300px" },
          borderRight: { md: "1px solid #C5705D" },
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            border: "1px solid #C5705D",
            borderRadius: 1,
            width: "100%",
            marginBottom: 5,
            backgroundColor: colors.wjite,
          }}
        >
          <Avatar
            sx={{
              width: 170,
              height: 170,
              backgroundColor: colors.button2,
              marginBottom: 3,
            }}
          />
          <Typography variant="body1" gutterBottom>
            {username}
          </Typography>
        </Box>
        {["Account", "Wishlist", "My Posts", "Logout"].map((label, index) => (
          <Button
            key={index}
            onClick={() => handleTabChange(index)}
            variant={activeTab === index ? "contained" : "outlined"}
            color={activeTab === index ? "primary" : "default"}
            sx={{
              width: "100%",
              justifyContent: "flex-start",
              marginBottom: 1,
              textTransform: "none",
              borderColor: colors.button2,
              color: activeTab === index ? "white" : "black",
              backgroundColor:
                activeTab === index ? colors.button2 : "transparent",
              "&:hover": {
                backgroundColor:
                  activeTab === index ? colors.hover2 : colors.hover2,
                transition: "background-color 0.3s",
              },
            }}
          >
            {label}
          </Button>
        ))}
      </Box>

      <Box
        sx={{ flexGrow: 1, margin: 2, padding: 5, backgroundColor: "white" }}
      >
        <Routes>
          <Route
            path="personalinfo"
            element={<Account username={username} email={email} />}
          />
          <Route path="wishlist" element={<Favorites username={username} />} />
          <Route
            path="myposts"
            element={
              <>
                <MyPosts
                  username={username}
                  myPosts={myPosts}
                  keyword={keyword}
                  pageNum={pageNum}
                />
              </>
            }
          />
          <Route
            path="logout"
            element={
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
            }
          />
        </Routes>
      </Box>
    </Paper>
  );
};

export default MyPage;
