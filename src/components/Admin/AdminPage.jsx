// src/pages/AdminPage.js

import React, { useEffect, useState } from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList, blockUser, resetRefreshToken, selectUserList } from '../../redux/slices/adminPageSlice';
import { Button, TextField } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#C5705D",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const AdminPage = () => {
  const dispatch = useDispatch();
  const { userList, currentPageNum, hasNext, keyword } = useSelector(selectUserList);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    dispatch(fetchUserList({ pageNum: currentPageNum - 1, keyword }));
  }, [dispatch, currentPageNum, keyword]);

  const handleSearch = () => {
    dispatch(fetchUserList({ pageNum: 0, keyword: searchKeyword }));
  };

  const handleBlockUser = (username) => {
    dispatch(blockUser(username));
  };

  const handleResetRefreshToken = (username) => {
    dispatch(resetRefreshToken(username));
  };

  const baseUrl = "http://localhost:3000/api/mypage";

  return (
    <div>
      <h1>사용자 목록</h1>

      <TextField
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="Search by username"
      />

      <Button 
        type="submit"
        variant="contained"                              
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>

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
                      <StyledTableCell>Username</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Posts</StyledTableCell>
                      <StyledTableCell>Comments</StyledTableCell>
                      <StyledTableCell>Authorities</StyledTableCell>
                      <StyledTableCell>Token Expires At</StyledTableCell>
                      <StyledTableCell>Blocked</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                    {userList.map((user) => (
                        <TableRow key={user.username}>

                        <TableCell>
                            <Link
                                to={`${baseUrl}/${user.username}`}
                                style={{
                                color: "#2c3e50",
                                }}
                            >
                                {user.username}
                            </Link>
                        </TableCell>

                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.postCount}</TableCell>
                        <TableCell>{user.commentCount}</TableCell>
                        <TableCell>{user.authorities}</TableCell>

                        <TableCell>
                            {
                                user.tokenExpiresAt === null ?
                                    "None"
                                    : 
                                    <Button 
                                      type="submit"
                                      variant="contained"                              
                                      color="primary"
                                      onClick={() => handleResetRefreshToken(user.username)}
                                    >
                                        {new Date(user.tokenExpiresAt).toLocaleDateString()}
                                    </Button>
                            }
                        </TableCell>
                        
                        <TableCell>
                            <Button 
                              type="submit"
                              variant="contained"                              
                              color="primary"
                              onClick={() => handleBlockUser(user.username)}
                            >
                                {user.blocked ? "Block" : "Unblock"}
                            </Button>
                        </TableCell>

                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            
        </TableContainer>
      </Paper>

      {hasNext && <button onClick={() => dispatch(fetchUserList({ pageNum: currentPageNum, keyword }))}>Load More</button>}
    </div>
  );
};

export default AdminPage;
