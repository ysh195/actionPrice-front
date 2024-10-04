/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowDown } from "react-icons/md";

const SubMenu = ({ menu }) => {

  return (
    <ul className="menu">
      {menu.subMenu.map((sub, index) => (
        <li key={index} className="menu_list">
          <div className="nav_menu">
            {sub.subMenu && (
              <span className="icon">
                <MdKeyboardArrowLeft />
              </span>
            )}
            <a href={sub.path}>{sub.title}</a>
            {sub.subMenu && (
              <span className="icon2">
                <MdKeyboardArrowDown />
              </span>
            )}
          </div>
          {sub.subMenu && (
            <>
              <ul className="sub_menu">
                {sub.subMenu.map((subSub, index) => (
                  <li key={index}>
                    <a href={subSub.path}>{subSub.title}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;
