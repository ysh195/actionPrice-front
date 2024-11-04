/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, fetchWishlist, removeFavorite } from "../../redux/slices/userSlice";
import ProductListView from "../Category/ProductListView";

const Favorites = ({ username }) => {
  const dispatch = useDispatch();
  const favoriteList = useSelector((state) => state.user.favoriteList || []);

  // Function to toggle favorite status
  const handleToggleFavorite = (product) => {
    if (favoriteList.some((fav) => fav.delId === product.delId)) {
      // If the product is already a favorite, remove it
      dispatch(removeFavorite(product.delId)); // Pass the product ID as payload
    } else {
      // Otherwise, add it to favorites
      dispatch(addFavorite(product)); // Pass the entire product as payload
    }
  };

  useEffect(() => {
    if (username) {
      dispatch(fetchWishlist(username));
    }
  }, [dispatch, username]);
  return (
    <div>
      <Typography>찜한 상품 목록</Typography>
    
    </div>
  );
};

export default Favorites;
