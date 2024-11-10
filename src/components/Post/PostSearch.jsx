/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const PostSearch = ({ onSearch, keyword }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

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
        label="검색"
        type="search"
        value={searchKeyword}
        onChange={handleChange}
      />
    </div>
  );
};

export default PostSearch;
