import React, { useState } from "react";
import { category_list } from "../assets/assest.js";
import { Link } from "react-router-dom";
import "../css/dropdown.css";

const Dropdown = () => {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? "dropdown-menu clicked" : "dropdown-menu"}
      >
        {category_list.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className="dropdown-link"
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
        
      </ul>
    </>
  );
}

export default Dropdown