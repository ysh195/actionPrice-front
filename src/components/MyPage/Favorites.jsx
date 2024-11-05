/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteList } from "../../redux/slices/favoriteSlice";
import { Link } from "react-router-dom";

const Favorites = ({ username }) => {
  const dispatch = useDispatch();
  const {favoriteList, status, error} = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(fetchFavoriteList(username));
  }, [dispatch, username]);

   if (status === "loading")
     return <Typography>Loading wishlist...</Typography>;
   if (status === "failed") return <Typography>Error: {error}</Typography>;




  return (
    <div>
      <Typography>찜한 상품 목록</Typography>
      <List>
        {favoriteList.map((item) => (
          <ListItem key={item.favoriteId}>
            <ListItemText
              primary={item.favoriteName}
              // secondary={item.favoriteURL}
            />
            <Link to={item.favoriteURL}> {item.favoriteName} </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Favorites;
