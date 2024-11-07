/* eslint-disable no-unused-vars */
// src/pages/AdminPage.js

import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { colors } from "../../assets/assest.js";

import { Link, useSearchParams } from "react-router-dom";
import { Box, Pagination, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserList,
  blockUser,
  resetRefreshToken,
  selectUserList,
} from "../../redux/slices/adminPageSlice";
import { Button, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.tableHead,
    color: colors.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

//todo: dont allow render search button first

const AdminPage = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams(); //show the current page number in the URL
  const [searchKeyword, setSearchKeyword] = useState("");
  const pageNum = parseInt(searchParams.get("pageNum")) || 1; // Get pageNum from URL or default to 1
  const keyword = searchParams.get("keyword") || "";
  const { userList, totalPageNum, hasNext } = useSelector(
    (state) => state.adminPage
  );

  // Fetch user list based on page number and keyword
  useEffect(() => {
    dispatch(fetchUserList({ pageNum: pageNum - 1, keyword }));
    setSearchParams({ pageNum, keyword }); // Update URL with current page number
  }, [dispatch, pageNum, keyword, setSearchParams]);

  const handleSearch = () => {
    // Update the searchParams in the URL
    setSearchParams({ keyword: searchKeyword, pageNum: 1 }); // Reset to page 1 on new search
    dispatch(fetchUserList({ pageNum: 0, keyword: searchKeyword })); // Fetch user list with new keyword
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1
    setSearchParams({ pageNum: value, keyword });
  };

  const handleBlockUser = (username) => {
    dispatch(blockUser(username));
  };

  const handleResetRefreshToken = (username) => {
    dispatch(resetRefreshToken(username));
  };

  return (
    <Box
      sx={{
        m: 3,
        p: 3,
        borderRadius: 2,
        boxShadow: 2,
        backgroundColor: colors.white,
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        사용자 목록
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          mb: 2,
        }}
      >
        <TextField
          type="text"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          placeholder="Search by username or email"
          sx={{ mr: 2, width: "250px" }}
        />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSearch}
          sx={{ backgroundColor: colors.button1 }}
        >
          Search
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table aria-label="User List Table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Posts</StyledTableCell>
                <StyledTableCell>Comments</StyledTableCell>
                <StyledTableCell>Authorities</StyledTableCell>
                <StyledTableCell>Blocked</StyledTableCell>
                <StyledTableCell>Token Reset</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {userList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No user exists with that keyword in the username or email.
                  </TableCell>
                </TableRow>
              ) : (
                userList.map((user) => (
                  <TableRow key={user.username}>
                    <TableCell>
                      <Link
                        to={`/api/mypage/${user.username}`}
                        style={{ color: colors.primary }}
                      >
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.postCount}</TableCell>
                    <TableCell>{user.commentCount}</TableCell>
                    <TableCell>{user.authorities}</TableCell>
                    <TableCell>
                      {user.tokenExpiresAt === null ? (
                        "None"
                      ) : (
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: user.blocked
                              ? colors.button1
                              : colors.button2,
                            color: "white", // text color
                            "&:hover": {
                              backgroundColor: user.blocked
                                ? colors.hover1
                                : colors.hover2,
                            },
                          }}
                          onClick={() => handleBlockUser(user.username)}
                        >
                          {user.blocked ? "Unblock" : "Block"}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.tokenExpiresAt === null ? (
                        "None"
                      ) : (
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: colors.button1 }}
                          onClick={() => handleResetRefreshToken(user.username)}
                        >
                          Reset
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Pagination
          count={totalPageNum} // Total number of pages from Redux state
          page={pageNum} // Current page
          onChange={handlePageChange}
          variant="outlined"
          sx={{ margin: "auto" }}
        />
      </Box>
    </Box>
  );
};

export default AdminPage;
