/* eslint-disable react/prop-types */
import React from "react";
import { category_list } from "../assets/assest";
import '../css/category.css'
import { Link } from "react-router-dom";

const Category = ({ category, setCategory }) => {
  return (
    <div className="">

      <div className="explore-menu" id="explore-menu">
        <h1>Explore our products</h1>
        
        <div className="explore-menu-list">
          {category_list.map((item, index) => {
            return (



              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === item.title ? "All" : item.title
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <Link to="/{item.path}">
                  <img
                    src={item.image}
                    className={category === item.title ? "active" : ""}
                    alt=""
                  />
                  <p>{item.title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
