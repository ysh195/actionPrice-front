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
import { Backdrop, styled } from "@mui/material";
import { useSelector } from "react-redux";
import { colors } from "../../assets/assest";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.tableHead,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
//any potential issues if postList is undefined by initializing it to an empty array.
const PostListView = ({ postList=[] }) => {
  const logined_username = useSelector((state) => state.login.username);
  const role = useSelector((state) => state.login.role);

  console.log("check postList in PostList component:", postList);

  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0]; // yyyy-mm-dd format
  };

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
              <StyledTableCell>등록일</StyledTableCell>
              <StyledTableCell>제목</StyledTableCell>
              <StyledTableCell>작성자</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {postList && postList.length > 0 ? (
              postList.map((post) => (
                <TableRow key={post.postId}>
                  <TableCell>{formatDate(post.createdAt)}</TableCell>
                  <TableCell>
                    {!post.published &&
                    logined_username !== post.username &&
                    role !== "ROLE_ADMIN" ? (
                      <span style={{ display: "flex", alignItems: "center" }}>
                        <LockIcon style={{ marginRight: 5 }} /> 비밀
                        글입니다.
                      </span>
                    ) : (
                      <Link
                        to={`/api/post/${post.postId}/detail?page=1`}
                        style={{ color: colors.primary }}
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
                <TableCell colSpan={4} align="center">
                  No posts available
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
