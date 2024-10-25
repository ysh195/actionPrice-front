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
import { Link } from "react-router-dom";

const PostTable = ({ postList }) => {
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
              <TableCell>ID</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>사용자 이름</TableCell>
              <TableCell>등록일</TableCell>
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
              postList.map((post, id) => (
                <TableRow key={id}>
                  <TableCell>{post.id}</TableCell>
                  <TableCell>
                    <Link to={`api/post/${post.id}/detail`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>{post.username}</TableCell>
                  <TableCell>{post.created_at}</TableCell>
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
