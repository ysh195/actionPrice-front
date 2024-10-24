/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";

console.log("render post table");

const PostTable = ({ postList }) => {
  // if (!Array.isArray(postList)) {
  //   return <Typography>No posts available.</Typography>;
  // }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden"}}>
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
              <TableCell>제목</TableCell>
              <TableCell>사용자 이름</TableCell>
              <TableCell>등록일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="post.id">
              <TableCell>post.id</TableCell>
              <TableCell >post.제목</TableCell>
              <TableCell>post.사용자이름</TableCell>

              <TableCell>post.등록일</TableCell>
            </TableRow>

            {/* {postList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.id}>
                  <TableCell>{post.id}</TableCell>
              
                  <TableCell>{post.title}</TableCell>
                      <TableCell>{post.username}</TableCell>
                  <TableCell>{post.created_at}</TableCell>
                  

                </TableRow>
              ))} */}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default PostTable;
