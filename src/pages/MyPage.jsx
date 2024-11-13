/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../components/MyPage/Sidebar";
import Favorites from "../components/MyPage/Favorites";
import MyPosts from "../components/MyPage/MyPosts";
import { Route, Routes, useParams } from "react-router-dom";

import { Box } from "@mui/material";

const MyPage = () => {
  const { username } = useParams();

  console.log("getting username from url", username);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        ml: "10rem",
        minHeight: "100vh",
      }}
    >
      <Sidebar />
      <Box
        sx={{
          pt: 12,
          width: "calc(100% - 150px)",
        }}
      >
        <Routes>
          <Route path="myposts" element={<MyPosts username={username} />} />
          <Route path="wishlist" element={<Favorites username={username} />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default MyPage;
