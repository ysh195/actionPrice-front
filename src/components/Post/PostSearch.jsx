/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";

import { colors } from "../../assets/assest";

const PostSearch = ({ onSearch, onReset, keyword }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [isSearching, setIsSearching] = useState(true);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  // Effect to sync the keyword from props
  // useEffect(() => {
  //   setSearchKeyword(keyword);
  // }, [keyword]);

  const handleSearch = () => {
    onSearch(searchKeyword); // Trigger search with current keyword
  };

  const handleChange = (e) => {
    const newKeyword = e.target.value;
    setSearchKeyword(newKeyword);

    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout to trigger the search after 500ms
    setDebounceTimeout(
      setTimeout(() => {
        onSearch(newKeyword); // Call search after the user stops typing
      }, 500) // Debounce delay (500ms)
    );
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        id="outlined-search"
        label="게시글 검색"
        type="search"
        value={searchKeyword}
        onChange={handleChange}
      />
    </div>
  );
};

export default PostSearch;
