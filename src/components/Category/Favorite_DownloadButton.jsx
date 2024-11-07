/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { createFavorite } from "../../redux/slices/favoriteSlice";
import { useDispatch } from "react-redux";
import {
  IconButton,
  Modal,
  Box,
  TextField,
  Button,
  Typography,
} from "@mui/material";
// import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { downloadExcel } from "../../redux/slices/categorySlice";
import GetAppIcon from "@mui/icons-material/GetApp";
import StarsIcon from "@mui/icons-material/Stars";

const Favorite_DownloadButton = ({
  selectedLarge,
  selectedMiddle,
  selectedSmall,
  selectedRank,
  logined_username,
  selectedStartDate,
  selectedEndDate,
  showDownloadButton,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [favorite_name, setFavorite_name] = useState("");
  const dispatch = useDispatch();

  const commonButtonStyles = {
    color: "green",
    "&:hover": {
      backgroundColor: "transparent", // No hover effect
    },
    "&:focus": {
      outline: "none", // Remove focus outline
    },
  };

  const handleFavoriteNameChange = (event) => {
    setFavorite_name(event.target.value);
  };

  const handleAddFavorite = () => {
    if (favorite_name.trim() === "") {
      alert("Please enter a name for your favorite item.");
      return;
    }
    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank) {
      return;
    }

    dispatch(
      createFavorite({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        logined_username,
        favorite_name,
      })
    );

    setFavorite_name("");
    setModalOpen(false);
  };

  const handleDownloadExcel = () => {
    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank) {
      return;
    }
    const large = selectedLarge;
    const middle = selectedMiddle;
    const small = selectedSmall;
    const rank = selectedRank;
    const startDate = selectedStartDate;
    const endDate = selectedEndDate;

    dispatch(downloadExcel({ large, middle, small, rank, startDate, endDate }));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 1,
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      {/* {showDownloadButton && ( */}
      <>
        <IconButton
          onClick={() => setModalOpen(true)}
          color="primary"
          sx={commonButtonStyles}
        >
          <StarsIcon fontSize="medium" sx={{ color: "tomato", mr: 0.5 }} />
          <span style={{ fontSize: "medium", color: "tomato" }}>즐겨찾기</span>
        </IconButton>

        {/* Modal for Adding Favorite */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="add-favorite-modal"
          aria-describedby="modal-to-add-favorite-name"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 3,
              width: 350,
              maxWidth: 400,
              minWidth: 250,
            }}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              즐겨찾기 목록 추가
            </Typography>

            <TextField
              label="즐겨찾기 이름"
              value={favorite_name}
              onChange={handleFavoriteNameChange}
              size="small"
              variant="outlined"
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddFavorite}
              sx={{
                alignSelf: "center",
                paddingX: 4,
                fontWeight: "bold",
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              추가
            </Button>
          </Box>
        </Modal>

        {/* Download Excel button */}
        <IconButton
          onClick={handleDownloadExcel}
          color="primary"
          aria-label="Download Excel"
          sx={commonButtonStyles}
        >
          <GetAppIcon fontSize="medium" sx={{ color: "tomato", mr: 0.5 }} />
          <span style={{ fontSize: "medium", color: "tomato" }}>Excel</span>
        </IconButton>
      </>
      {/* )} */}
    </Box>
  );
};

export default Favorite_DownloadButton;
