/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  tableCellClasses,
  Button,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite, fetchFavoriteList } from "../../redux/slices/favoriteSlice";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main, // Use theme color for better compatibility
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const Favorites = ({username} ) => {
  const dispatch = useDispatch();
  const { favoriteList, status, error } = useSelector(
    (state) => state.favorite
  );

  useEffect(() => {
    dispatch(fetchFavoriteList(username));
  }, [dispatch, username]);

  const handleDeleteFavorite = async (favoriteId) => {
    const resultAction = await dispatch(deleteFavorite(favoriteId));
    if (deleteFavorite.fulfilled.match(resultAction)) {
      // Optionally show a success message
      console.log("Favorite deleted successfully");
      dispatch(fetchFavoriteList(username)); // Re-fetch the updated list
    } else {
      // Optionally show an error message
      console.error("Failed to delete favorite:", resultAction.error);
    }
  };

  if (status === "loading") return <Typography>Loading wishlist...</Typography>;
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        찜한 상품 목록
      </Typography>
      <Paper sx={{ width: "100%" }}>
        <TableContainer sx={{ marginTop: 2, marginBottom: 2 }}>
          <Table aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>상품명</StyledTableCell>
                <StyledTableCell>링크</StyledTableCell>
                <StyledTableCell>삭제</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {favoriteList && favoriteList.length > 0 ? (
                favoriteList.map((favorite, index) => (
                  <TableRow key={favorite.favoriteId}>
                    <StyledTableCell>{index + 1}</StyledTableCell>
                    <StyledTableCell>
                      <Link
                        to={favorite.favoriteURL}
                        style={{ color: "inherit", textDecoration: "none" }}
                      >
                        {favorite.favoriteName}
                      </Link>
                    </StyledTableCell>

                    <StyledTableCell>
                      <Link to={favorite.favoriteURL}>View</Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                          handleDeleteFavorite(favorite.favoriteId)
                        }
                      >
                        삭제
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <StyledTableCell colSpan={4} align="center">
                    찜한 상품 리스트 없습니다.
                  </StyledTableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default Favorites;
