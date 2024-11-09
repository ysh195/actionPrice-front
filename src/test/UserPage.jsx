/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Favorites from "../components/MyPage/Favorites";
import MyPosts from "../components/MyPage/MyPosts";
import { Route, Routes, useParams } from "react-router-dom";

import { Box } from "@mui/material";

const UserPage = () => {
  const { username } = useParams();

  console.log("getting username from url", username);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          marginLeft: "150px", // Offset main content to the right of the sidebar
          padding: 2,
          width: "calc(100% - 150px)", // Fill the remaining width
          // border: "1px solid red",
        }}
      >
        <Routes>
          <Route path="myposts" element={<MyPosts username={username} />} />
          <Route path="wishlist" element={<Favorites username={username} />} />
        </Routes>
      </Box>
    </div>
  );
};

export default UserPage;
