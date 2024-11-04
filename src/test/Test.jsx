import React, { useState } from "react";
import { useLocation } from "react-router-dom";



const Sidebar = () => {
  const location = useLocation();

  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  return (
    <div className={closeMenu === false ? "sidebar" : "sidebar active"}>
      <div
        className={
          closeMenu === false ? "logoContainer" : "logoContainer active"
        }
      >
        <img src={""} alt="icon" className="logo" />
        <h2 className="title">evergreen. </h2>
      </div>
      <div
        className={
          closeMenu === false ? "burgerContainer" : "burgerContainer active"
        }
      >
        <div
          className="burgerTrigger"
          onClick={() => {
            handleCloseMenu();
          }}
        ></div>
        <div className="burgerMenu"></div>
      </div>
      <div
        className={
          closeMenu === false ? "profileContainer" : "profileContainer active"
        }
      >
        <img src={''} alt="profile" className="profile" />
        <div className="profileContents">
          <p className="name">Hello, John👋</p>
          <p>johnsmith@gmail.com</p>
        </div>
      </div>
      <div
        className={
          closeMenu === false ? "contentsContainer" : "contentsContainer active"
        }
      >
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <img src={''} alt="dashboard" />
            <a href="/">dashboard</a>
          </li>
          <li className={location.pathname === "/transactions" ? "active" : ""}>
            <img src={''} alt="transactions" />
            <a href="/transactions">transactions</a>
          </li>
          <li className={location.pathname === "/performance" ? "active" : ""}>
            <img src={''} alt="Performance" />
            <a href="/performance">performance</a>
          </li>
          <li className={location.pathname === "/news" ? "active" : ""}>
            <img src={''} alt="News" />
            <a href="/news">news</a>
          </li>
          <li className={location.pathname === "/settings" ? "active" : ""}>
            <img src={''} alt="Settings" />
            <a href="/settings">settings</a>
          </li>
          <li className={location.pathname === "/support" ? "active" : ""}>
            <img src={''} alt="Support" />
            <a href="/support">support</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
