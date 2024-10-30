/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const PostSearch = ({ onSearch, onReset, keyword }) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [isSearching, setIsSearching] = useState(true);

  // Effect to sync the keyword from props
  useEffect(() => {
    setSearchKeyword(keyword);
    if (!keyword) {
      setIsSearching(false);
    }
  }, [keyword]);

  const handleSearch = () => {
    onSearch(searchKeyword);
    setIsSearching(true);
    console.log(isSearching);
  };

  const handleReset = () => {
    setSearchKeyword(""); // Reset the search input
    onReset(); // Call the reset function
    setIsSearching(false); // Reset searching state
    console.log(isSearching);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={searchKeyword} // Controlled component
        onChange={(e) => setSearchKeyword(e.target.value)} // Update state on change
        placeholder="게시글 검색"
        style={{
          marginRight: "8px",
          border: "none",
          borderBottom: "1px solid #2c3e50",
          outline: "none",
          padding: "4px",
        }}
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ backgroundColor: "#2c3e50" }}
      >
        검색
      </Button>
      {isSearching &&
        searchKeyword && ( // Show icon only when searching and keyword exists
          <ClearIcon
            onClick={handleReset}
            sx={{ marginLeft: 1, cursor: "pointer" }}
          />
        )}
    </div>
  );
};

export default PostSearch;
