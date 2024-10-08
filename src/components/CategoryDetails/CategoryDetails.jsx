import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const CategoryDetails = () => {
  const buttons = [
    "Hoodies",
    "Dresses",
    "Suits",
    "Shoes",
    "T-Shirts",
    "Jeans",
    "Jackets",
    "Bags",
  ];
  const bigCategory = [
    { id: "1", name: "Meat" },
    { id: "2", name: "Veggie" },
    { id: "3", name: "Fish" },
    { id: "4", name: "Diary" },
  ];
  const midlleCategory = [
    { id: "1", categoryId: "1", name: "Haryana" },
    { id: "2", categoryId: "1", name: "Delhi" },
    { id: "3", categoryId: "2", name: "Texas" },
    { id: "4", categoryId: "2", name: "California" },
  ];
  const smallCategory = [
    { id: "1", smallCategoryId: "1", name: "Faridabad" },
    { id: "2", smallCategoryId: "1", name: "Palwal" },
    { id: "3", smallCategoryId: "2", name: "Mandi House" },
    { id: "4", smallCategoryId: "2", name: "kalka Ji" },
    { id: "1", smallCategoryId: "3", name: "Houston" },
    { id: "2", smallCategoryId: "3", name: "Austin" },
    { id: "3", smallCategoryId: "4", name: "Los Angeles" },
    { id: "4", smallCategoryId: "4", name: "Son Diego" },
  ];
  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);

  useEffect(() => {
    setCategory1(bigCategory);
  }, []);

  const handleCategory1 = (id) => {
    const data = midlleCategory.filter((middle) => middle.categoryId === id);
    setCategory2(data);
  };

  const handleCategory2 = (id) => {
    const data = smallCategory.filter((small) => small.smallCategoryId === id);
    setCategory3(data);
  };
  return (
    <div className="wrapper">
      <div className="category">
        {buttons.map((button, index) => (
          <div key={index}>
            <Link to={"/filteredProducts/" + button}>
              <Button variant="outlined">{button}</Button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <select
          id="bigCategory"
          className="form-control select-class"
          onChange={(e) => handleCategory1(e.target.value)}
        >
          <option value="0">Select Category 1</option>
          {category1 && category1 !== undefined
            ? category1.map((big, index) => {
                return (
                  <option key={index} value={big.id}>
                    {big.name}
                  </option>
                );
              })
            : "No Big Category"}
        </select>
        <br></br>
        <select
          id="middleCategory"
          className="form-control select-class"
          onChange={(e) => handleCategory2(e.target.value)}
        >
          <option value="0">Select Category 2</option>
          {category2 && category2 !== undefined
            ? category2.map((middle, index) => {
                return (
                  <option key={index} value={middle.id}>
                    {middle.name}
                  </option>
                );
              })
            : "No Medium Category"}
        </select>
        <br></br>
        <select id="smallCategory" className="form-control select-class">
          <option value="0">Select Category 3</option>
          {category3 && category3 !== undefined
            ? category3.map((small, index) => {
                return (
                  <option key={index} value={small.id}>
                    {small.name}
                  </option>
                );
              })
            : "No Small Category"}
        </select>
      </div>
    </div>
  );
};
export default CategoryDetails;
