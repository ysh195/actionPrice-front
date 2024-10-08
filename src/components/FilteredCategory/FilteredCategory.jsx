import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const FilteredCategory = () => {
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

  return (
    <div>
      {buttons.map((button, index) => (
        <div key={index}>
          {button}
          <Link to={"/filteredProducts/" + button}>
            <Button
              color="gray"
              size="lg"
              variant="outlined"
              ripple={true}
              className="text-black hover:bg-gray-300 duration-300 ease-in-out"
            >
              {button}
            </Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FilteredCategory;
