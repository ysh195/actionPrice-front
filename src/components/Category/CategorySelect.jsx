/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

const CategorySelect = ({
  label,
  value,
  handleCategoryChange,
  categoryList,
  categoryType, 
}) => {
  return (
  
      <FormControl sx={{ width: "200px" }} margin="normal">
        <InputLabel
          style={{
            transform: value ? "translate(0, -1.5em) scale(0.75)" : undefined,
          }}
        >
          {label}
        </InputLabel>
        <Select
          value={value}
          onChange={(e) => handleCategoryChange(categoryType, e.target.value)}
        >
          {categoryList.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

  );
};

export default CategorySelect;
