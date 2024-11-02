/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Box,
  Avatar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { colors } from "../assets/assest";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/loginSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteAccount,
  getMyPosts,
  getPersonalInfo,
} from "../redux/slices/userSlice";
import Swal from "sweetalert2";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.login.username);
  const email = useSelector((state) => state.user.email);
  const { myPosts } = useSelector((state) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(getPersonalInfo(username));
      dispatch(getMyPosts({ username, keyword: "", pageNum: 0 }));
    }
  }, [dispatch, username]);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/api/user/login");
  };

  const handleDeleteAccount = async () => {
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
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography>사용자 이름: {username || "Not provided"}</Typography>
            <Typography>이메일: {email || "Not provided"}</Typography>
          </Box>
        );
      case 1:
        return <Typography>찜한 상품 목록</Typography>; // Wishlist content here
      case 2:
        return (
          <Box sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              {username}님의 게시글 목록
            </Typography>

            <TableContainer
              sx={{
                maxHeight: 440,
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>작성자</TableCell>
                    <TableCell>제목</TableCell>
                    <TableCell>등록일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myPosts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        No posts available
                      </TableCell>
                    </TableRow>
                  ) : (
                    myPosts.map((post, postId) => (
                      <TableRow key={postId}>
                        <TableCell>{post.postId}</TableCell>
                        <TableCell>{post.username}</TableCell>
                        <TableCell>
                          <Link
                            to={`/api/post/${post.postId}/detail`}
                            style={{
                              color: colors.primary,

                              textDecoration: "",
                            }}
                          >
                            {post.title}
                          </Link>
                        </TableCell>

                        <TableCell>
                          {new Date(post.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
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
              onClick={handleDeleteAccount}
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
        {renderContent()}
      </Box>
    </Paper>
  );
};

export default MyPage;
