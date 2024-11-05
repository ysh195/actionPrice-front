/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteList } from "../../redux/slices/favoriteSlice";
import { Link, useNavigate } from "react-router-dom";

const Favorites = ({ username }) => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { favoriteList, status, error } = useSelector(
    (state) => state.favorite
  );

  useEffect(() => {
    dispatch(fetchFavoriteList(username));
  }, [dispatch, username]);

   const handleFavoriteClick = (url) => {
     navigate(url);
   };

  if (status === "loading") return <Typography>Loading wishlist...</Typography>;
  if (status === "failed") return <Typography>Error: {error}</Typography>;

  return (
    <div>
      <Typography>찜한 상품 목록</Typography>
      {/* <List>
        {favoriteList.map((item) => (
          <ListItem
            key={item.favoriteId}
            button
            onClick={() => handleFavoriteClick(item.favoriteURL)}
          >
            {item.favoriteName}
          </ListItem>
        ))}
      </List> */}

      <div>

        <ul>
          {favoriteList.map((favorite) => (
            <li key={favorite.favoriteId}>
              <Link to={favorite.favoriteURL}>{favorite.favoriteName}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Favorites;
