/* eslint-disable no-unused-vars */
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
import { downloadExcel } from "../../redux/slices/categorySlice";
import GetAppIcon from "@mui/icons-material/GetApp";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Swal from "sweetalert2";

const Favorite_DownloadButton = ({
  selectedLarge,
  selectedMiddle,
  selectedSmall,
  selectedRank,
  logined_username,
  selectedStartDate,
  selectedEndDate,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [favorite_name, setFavorite_name] = useState("");
  const dispatch = useDispatch();

  const commonButtonStyles = {
    color: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid lightgray",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Adds shadow on hover
    },
    "&:focus": {
      outline: "none", // Remove focus outline
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.3)", // Optional shadow for focus
    },
  };

  const handleFavoriteNameChange = (event) => {
    setFavorite_name(event.target.value);
  };

  const handleAddFavorite = () => {
    if (favorite_name.trim() === "") {
      setModalOpen(false);
      setFavorite_name("");
      Swal.fire({
        icon: "error",
        title: "잠깐!",
        text: "즐겨찾기 항목의 이름을 입력해주세요.",
      });
      return;
    }

    if (!logined_username) {
      setModalOpen(false);
      setFavorite_name("");
      Swal.fire({
        icon: "error",
        text: "로그인 하고 나서 즐겨찾기 등록이 가능합니다.",
      });

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
      <>
        <IconButton
          onClick={() => setModalOpen(true)}
          color="primary"
          sx={commonButtonStyles}
        >
          <StarOutlineIcon fontSize="medium" />
          <span
            style={{
              fontSize: "medium",
            }}
          >
            관심설정
          </span>
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
          <GetAppIcon fontSize="medium" />
          <span style={{ fontSize: "medium" }}>Excel</span>
        </IconButton>
      </>
    </Box>
  );
};

export default Favorite_DownloadButton;
