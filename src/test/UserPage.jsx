/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "./Sidebar";
import Favorites from "../components/MyPage/Favorites";
import MyPosts from "../components/MyPage/MyPosts";
import { Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Test from "./Test";
import { Box } from "@mui/material";

const UserPage = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const pageNum = parseInt(searchParams.get("pageNum")) || 1;
  const { myPosts } = useSelector((state) => state.user);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      {/* <Test /> */}

      {/* <div style={{ flex: 1, padding: "20px" }}> */}
      <Box
        sx={{
          marginLeft: "240px", // Offset main content to the right of the sidebar
          padding: 2,
          width: "calc(100% - 240px)", // Fill the remaining width
        }}
      >
        <Routes>
          <Route
            path="myposts"
            element={
              <MyPosts
                username={username}
                myPosts={myPosts}
                keyword={keyword}
                pageNum={pageNum}
              />
            }
          />
          <Route path="wishlist" element={<Favorites username={username} />} />
          <Route
            index
            element={<MyPosts username={username} myPosts={myPosts} />}
          />
        </Routes>
        {/* </div> */}
      </Box>
    </div>
  );
};

export default UserPage;
