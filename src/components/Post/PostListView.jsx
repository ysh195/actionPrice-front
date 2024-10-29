/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { Pagination, styled } from "@mui/material";

const PostListView = ({ postList }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#C5705D",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  console.log("check postList in PostList component:", postList);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>작성자</StyledTableCell>
              <StyledTableCell>제목</StyledTableCell>
              <StyledTableCell>등록일</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No posts available
                </TableCell>
              </TableRow>
            ) : (
              postList.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell>{post.postId}</TableCell>
                  <TableCell>{post.username}</TableCell>
                  <TableCell>
                    <Link
                      to={`/api/post/${post.postId}/detail`}
                      style={{
                        color: "#2c3e50",
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
      {/* <Pagination
        count={totalPageNum}
        page={currentPageNum +1 } 
        onChange={handlePageChange}
        variant="outlined"
        sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}
      /> */}
    </Paper>
  );
};

export default PostListView;
