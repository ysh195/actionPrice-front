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
  const { currentPageNum } = useSelector((state) => state.comment);
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
                  <TableCell>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    <Link
                      to={`/api/post/${post.postId}/detail/1`}
                      style={{
                        color: "#2c3e50",
                      }}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.username}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PostListView;
