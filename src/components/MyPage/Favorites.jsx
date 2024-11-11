/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Paper,
  Typography,
  Button,
  Box,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorite,
  fetchFavoriteList,
} from "../../redux/slices/favoriteSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Favorites = ({ username }) => {
  const dispatch = useDispatch();
  const { favoriteList, status, error, loading } = useSelector(
    (state) => state.favorite
  );

  console.log("got username from mypage:", username);

  useEffect(() => {
    dispatch(fetchFavoriteList(username));
    console.log("check username in fetchFavoriteList:", username);
  }, [dispatch, username]);

  const handleDeleteFavorite = async (favoriteId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제 후 취소할 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
      reverseButtons: true, // Reverse the order of buttons
    });

    // If user confirms the deletion
    if (result.isConfirmed) {
      const resultAction = await dispatch(deleteFavorite(favoriteId));
      if (deleteFavorite.fulfilled.match(resultAction)) {
        console.log("Favorite deleted successfully");

        dispatch(fetchFavoriteList(username)); // Refresh the list after deletion
        Swal.fire(
          "삭제 완료!",
          "즐겨찾기가 성공적으로 삭제되었습니다.",
          "success"
        ); // Success message
      } else {
        console.error("Failed to delete favorite:", resultAction.error);
        Swal.fire(
          "Oops!",
          "즐겨찾기 삭제에 실패했습니다. 다시 시도해 주세요.",
          "error"
        ); // Error message
      }
    } else {
      // If user cancels the deletion
      Swal.fire("취소되었습니다", "info"); // Cancellation message
    }
  };

  if (status === "loading") return <Typography>Loading wishlist...</Typography>;
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom>
        {username}님의 관심 목록
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 1,
          gridTemplateColumns: "1fr",
          width: "80%",
        }}
      >
        {favoriteList && favoriteList.length > 0 ? (
          favoriteList.map((favorite, index) => (
            <Card
              key={favorite.favoriteId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 2,
                padding: 1,
                transition: "box-shadow 0.3s",
                "&:hover": { boxShadow: 4 },
              }}
            >
              <Typography variant="subtitle1" 
              // fontWeight="bold" 
              sx={{ ml: 1 }}>
                {index + 1}.
              </Typography>
              <CardContent sx={{ flex: 1 }}>
                <Link
                  to={favorite.favoriteURL}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="subtitle1">
                    {favorite.favoriteName}
                  </Typography>
                </Link>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDeleteFavorite(favorite.favoriteId)}
                >
                  삭제
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center" }}>
            <Typography>찜한 상품 리스트 없습니다.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
