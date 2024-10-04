import React, { useState } from "react";
import "./Header.css";
import { dropMenu, icons } from "../../assets/assest";
import { Link } from "react-router-dom";
import SubMenu from "./SubMenu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <div className="header">
      <div className="wrapper">
        <div className="logo">
          <Link to="/">
            <img className="logo" src={icons.logo} alt="" />
          </Link>
        </div>
        {/* if openMenu is true, add active class here */}
        <div className={`shadow ${openMenu && "active"}`} />

        <ul className={`navigation ${openMenu && "active"}`}>
          <span className="close_menu" onClick={() => setOpenMenu(false)}>
            <FaTimes />
          </span>
          {dropMenu.map((menu, index) => (
            <li key={index} className="list_menu">
              <div className="nav_menu">
                <a href={menu.path}>{menu.title}</a>
                {menu.subMenu && (
                  <span className="menu_icon">
                    <MdKeyboardArrowDown />
                  </span>
                )}
              </div>
              {menu.subMenu && (
                <div className="sub_menu">
                  <SubMenu menu={menu} />
                </div>
              )}
            </li>
          ))}
        </ul>
        <span className="bar_menu" onClick={() => setOpenMenu(true)}>
          <FaBars />
        </span>
      </div>
    </div>
  );
};

export default Header;
