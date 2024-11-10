/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { format } from "date-fns";

import { colors } from "../../assets/assest";

const StyledTableCell = (props) => (
  <TableCell
    {...props}
    sx={{
      fontWeight: "bold",
      backgroundColor: colors.tableHead,
      color: "white",
    }}
  />
);
//any potential issues if postList is undefined by initializing it to an empty array.
const PostListView = ({ postList = [], pageNum }) => {
  const itemsPerPage = 10;
  const logined_username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  console.log("check postList in PostList component:", postList);

  const formatDate = (date) => {
    try {
      return format(new Date(date), "yyyy-MM-dd"); // Format as 'yyyy-mm-dd'
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };

  return (
    <Paper sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}>
      <TableContainer
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Table aria-label="custom styled table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>등록일</StyledTableCell>
              <StyledTableCell>제목</StyledTableCell>
              <StyledTableCell>작성자</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList && postList.length > 0 ? (
              postList.map((post, index) => (
                <TableRow
                  key={post.postId}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#f9f9f9",
                    },
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell>
                    {(pageNum - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>
                    {!post.published &&
                    logined_username !== post.username &&
                    role !== "ROLE_ADMIN" ? (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <LockIcon style={{ marginRight: 5 }} /> 비밀 글입니다.
                      </span>
                    ) : (
                      <Link
                        to={`/api/post/${post.postId}/detail?page=1`}
                        style={{
                          color: colors.primary,
                          textDecoration: "none",
                        }}
                      >
                        {post.title}
                      </Link>
                    )}
                  </TableCell>
                  <TableCell>{post.username}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography>No posts available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PostListView;
