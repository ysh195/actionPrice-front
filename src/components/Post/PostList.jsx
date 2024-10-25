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
import { styled } from "@mui/material";

const PostTable = ({ postList }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#C5705D",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));
  return (
    <Paper sx={{ width: "100%" }}>
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
              postList.map((post, postId) => (
                <TableRow key={postId}>
                  <TableCell>{post.postId}</TableCell>
                  <TableCell>{post.username}</TableCell>
                  <TableCell>
                    <Link
                      to={`/api/post/${post.postId}/detail`}
                      style={{
                        color: "#2c3e50",
                        
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
    </Paper>
  );
};

export default PostTable;
