/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "@mui/material";

const PostSearch = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword); 
    setKeyword("");
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
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
    </div>
  );
};

export default PostSearch;
