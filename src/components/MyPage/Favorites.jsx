/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Paper,
  Typography,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavorite,
  fetchFavoriteList,
} from "../../redux/slices/favoriteSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { colors } from "../../assets/assest";

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

      // Handle success or failure
      const message = deleteFavorite.fulfilled.match(resultAction)
        ? {
            title: "삭제 완료!",
            text: "즐겨찾기가 성공적으로 삭제되었습니다.",
            icon: "success",
          }
        : {
            title: "Oops!",
            text: "즐겨찾기 삭제에 실패했습니다. 다시 시도해 주세요.",
            icon: "error",
          };

      // Show success/error message
      Swal.fire(message);

      if (deleteFavorite.fulfilled.match(resultAction)) {
        dispatch(fetchFavoriteList(username)); // Refresh the list after deletion
      }
    } else {
      // If user cancels the deletion
      Swal.fire("취소되었습니다", "info");
    }
  };

  if (status === "loading") return <Typography>Loading wishlist...</Typography>;
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: colors.darkBrown, mb: 5 }}
      >
        {username}님의 관심 목록
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 1,
          bgcolor: colors.paperbeige,
          padding: 3,
          borderRadius: 2,
          border: `1px solid ${colors.rose}`,
          boxShadow: 2,
          width: { xs: "100%", md: "70%" },
          minWidth: "500px", // Limit the width on large screens
        }}
      >
        {favoriteList && favoriteList.length > 0 ? (
          favoriteList.map((favorite, index) => (
            <Box
              key={favorite.favoriteId}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #ddd",
                padding: 0.5,
                marginX: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                {index + 1}.
              </Typography>

              <Box
                sx={{
                  flex: 1,
                  ml: 4,
                }}
              >
                <Link
                  to={favorite.favoriteURL}
                  style={{
                    color: colors.darkBrown,
                    textDecoration: "none",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      "&:hover": {
                        fontWeight: "600",
                        fontSize: "19px",
                      },
                    }}
                  >
                    {favorite.favoriteName}
                  </Typography>
                </Link>
              </Box>

              <Button
                onClick={() => handleDeleteFavorite(favorite.favoriteId)}
                sx={{
                  color: colors.darkBrown,
                  border: `2px solid ${colors.rose}`,
                  "&:hover": {
                    backgroundColor: colors.rose,
                    color: "white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Adds shadow on hover
                  },
                }}
              >
                삭제
              </Button>
            </Box>
          ))
        ) : (
          <Paper elevation={3} sx={{ padding: 3, textAlign: "center", mt: 2 }}>
            <Typography>저장된 관심 목록이 찜한 없습니다.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default Favorites;
