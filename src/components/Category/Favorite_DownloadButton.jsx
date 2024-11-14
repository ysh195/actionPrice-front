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
import { useNavigate } from "react-router-dom";
import { colors } from "../../assets/assest";

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
  const navigate = useNavigate();

  const commonButtonStyles = {
    color: "#004236",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      color: "white",
      backgroundColor: colors.green,
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    },
    "&:focus": {
      outline: "none", // Remove focus outline
      boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.2)",
    },
  };

  const handleFavoriteNameChange = (event) => {
    setFavorite_name(event.target.value);
  };

  const handleAddFavorite = async (e) => {
    e.preventDefault();

    if (!favorite_name.trim()) {
      return showError("즐겨찾기 항목의 이름을 입력해주세요.");
    }

    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank)
      return showError(
        "  모든 카테고리를 선택 후 즐겨찾기가 등록할 수 있습니다."
      );

    try {
      await dispatch(
        createFavorite({
          large: selectedLarge,
          middle: selectedMiddle,
          small: selectedSmall,
          rank: selectedRank,
          logined_username,
          favorite_name,
        })
      ).unwrap();
      showSuccess("즐겨찾기가 추가 되었습니다.");
    } catch {
      Swal.fire({
        icon: "error",
        text: "즐겨찾기의 최대 갯수인 10개에 도달하여 더 이상 추가할 수 없습니다.",
        showConfirmButton: true,
        confirmButtonText: "마이페이지로 이동",
        showCancelButton: true,
        cancelButtonText: "닫기",
      }).then((result) => {
        if (result.isConfirmed)
          navigate(`/api/mypage/${logined_username}/wishlist`);
      });
    }

    setFavorite_name("");
    setModalOpen(false);
  };

  const showError = (message) => {
    setModalOpen(false);
    setFavorite_name("");
    Swal.fire({ icon: "error", text: message });
  };

  const showSuccess = (message) => {
    Swal.fire({
      icon: "success",
      title: "완료!",
      text: message,
      showConfirmButton: true,
      confirmButtonText: "마이페이지로 이동",
      showCancelButton: true,
      cancelButtonText: "닫기",
    }).then((result) => {
      if (result.isConfirmed)
        navigate(`/api/mypage/${logined_username}/wishlist`);
    });
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
        alignSelf: "flex-start",
        gap: 1,
        width: "100%",
        ml: { xs: 3, md: 10 },
      }}
    >
      {logined_username && (
        <IconButton
          onClick={() => setModalOpen(true)}
          sx={commonButtonStyles}
          aria-label="Set Favorite" // Add aria-label for accessibility
        >
          <StarOutlineIcon fontSize="medium" />
          <span
            style={{
              fontSize: "medium",
            }}
          >
            즐겨찾기 설정
          </span>
        </IconButton>
      )}

      {/* Modal for Adding Favorite */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="add-favorite-modal"
        aria-describedby="modal-to-add-favorite-name"
        aria-hidden={!modalOpen} // Ensure modal content is not hidden
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
            onClick={handleAddFavorite}
            sx={{
              alignSelf: "center",
              paddingX: 4,
              fontWeight: "bold",
              borderRadius: 1,
              backgroundColor: colors.rose,
              color: "white",
            }}
          >
            추가하기
          </Button>
        </Box>
      </Modal>

      {/* Download Excel button */}
      <IconButton
        onClick={handleDownloadExcel}
        aria-label="Download Excel"
        sx={commonButtonStyles}
      >
        <GetAppIcon fontSize="medium" />
        <span style={{ fontSize: "medium" }}>Excel</span>
      </IconButton>
    </Box>
  );
};

export default Favorite_DownloadButton;
