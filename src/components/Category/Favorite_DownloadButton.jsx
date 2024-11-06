/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { createFavorite } from '../../redux/slices/favoriteSlice';
import { useDispatch } from 'react-redux';
import { IconButton, Modal, Box, TextField, Button } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { downloadExcel } from '../../redux/slices/categorySlice';
import GetAppIcon from "@mui/icons-material/GetApp";


const Favorite_DownloadButton = ({
  selectedLarge,
  selectedMiddle,
  selectedSmall,
  selectedRank,
  logined_username,
  selectedStartDate,
  selectedEndDate,
  productList,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [favorite_name, setFavorite_name] = useState("");
  const [showDownloadButton, setShowDownloadButton] = useState(false);
  const dispatch = useDispatch();

    useEffect(() => {
      // Update visibility of download button if the productList has items
      if (productList && productList.length > 0) {
        setShowDownloadButton(true);
      } else {
        setShowDownloadButton(false);
      }
    }, [productList]);

  const handleFavoriteNameChange = (event) => {
    setFavorite_name(event.target.value);
  };

  const handleAddFavorite = () => {
    if (favorite_name.trim() === "") {
      alert("Please enter a name for your favorite item.");
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
    <Box>
      {/* Add to Favorites Icon Button */}
      <IconButton
        onClick={() => setModalOpen(true)}
        color="primary"
        sx={{
          color: "green", // Inherit color from parent
          "&:hover": {
            backgroundColor: "transparent", // No hover effect
          },
          "&:focus": {
            outline: "none", // Remove focus outline
          },
        }}
      >
        <BookmarksIcon fontSize="large" sx={{ color: "green", mr: 2 }} />
        <span style={{ color: "green" }}>찜하기</span>
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
            borderRadius: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 300, // Adjust width as needed
          }}
        >
          <h2 id="add-favorite-modal">Add to Favorites</h2>
          <TextField
            label="Favorite Name"
            value={favorite_name}
            onChange={handleFavoriteNameChange}
            size="small"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddFavorite}
          >
            추가
          </Button>
        </Box>
      </Modal>
      {/* Download button */}
      {showDownloadButton && (
        <IconButton
          onClick={handleDownloadExcel}
          color="primary"
          aria-label="Download Excel"
          sx={{ color: "green", display: "flex", alignItems: "center" }} 
        >
          <GetAppIcon fontSize="large" sx={{ color: "green", mr: 1 }} />
          <span style={{ color: "green" }}>Excel</span>
        </IconButton>
      )}
    </Box>
  );
};

export default Favorite_DownloadButton;