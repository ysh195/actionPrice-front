/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import { styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C5705D",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const PostListView = ({ postList }) => {
  const username = useSelector((state) => state.login.username);
  const role = useSelector((state) => state.login.role);

  console.log("check postList in PostList component:", postList);
  if (!postList || postList.length === 0) {
    return <Typography>No posts available.</Typography>;
  }

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
              <StyledTableCell>등록일</StyledTableCell>
              <StyledTableCell>제목</StyledTableCell>
              <StyledTableCell>작성자</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList.map((post) => (
              <TableRow key={post.postId}>
                <TableCell>{post.postId}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {post.isSecret &&
                  username !== post.username &&
                  role !== "ROLE_ADMIN" ? (
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <LockIcon style={{ marginRight: 4 }} />
                      비밀 글입니다.
                    </span>
                  ) : (
                    <Link
                      to={`/api/post/${post.postId}/detail`}
                      style={{ color: "#2c3e50" }}
                    >
                      {post.title}
                    </Link>
                  )}
                </TableCell>
                <TableCell>{post.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PostListView;
