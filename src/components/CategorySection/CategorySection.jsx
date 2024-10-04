/* eslint-disable react/prop-types */
import React from "react";
import { category_list } from "../../assets/assest";
import "./CategorySection.css";

const CategorySection = ({ category, setCategory }) => {
  return (
    <div className="explore-categ">
      <h1>Explore Categories</h1>
      <div className="categ-container">
        {category_list.map((category, index) => (
          <div key={index} className="categ-card">
            <img
              src={category.image}
              alt={category.title}
              className="categ-img"
            />
            <div className="categ-info">
              <p className="categ-name">{category.title}</p>

              <p> View All</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
