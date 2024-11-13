/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { colors } from "../../assets/assest";

const CategorySelect = ({
  label,
  value,
  handleCategoryChange,
  categoryList,
  categoryType,
}) => {
  return (
    <FormControl
      sx={{
        width: 250,
        minWidth: 100,
        justifyContent: "center",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#00403d", // default border color
          },

          "&.Mui-focused fieldset": {
            borderColor: "#00403d", // focused border color
          },
        },
      }}
    >
      <InputLabel
        style={{
          transform: value ? "translate(0, -1.5em) scale(0.75)" : undefined,
          color: colors.brown,
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
