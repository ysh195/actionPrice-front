/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
// Navbar.js
import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaBell, FaUserCircle } from "react-icons/fa";

const Test2 = React.memo(({ isLoggedIn, onLogout, onLinkClick }) => {
  const navigate = useNavigate();
  return (
    <Nav className="ml-auto">
      <Nav.Link as={Link} to="/" onClick={onLinkClick}>
        Home
      </Nav.Link>
      <Nav.Link href="#categories" onClick={onLinkClick}>
        Categories
      </Nav.Link>
      <Nav.Link as={Link} to="/contact-us" onClick={onLinkClick}>
        Contact Us
      </Nav.Link>
      <Nav.Link>
        <FaBell />
      </Nav.Link>
      <Nav.Link>
        <FaHeart />
      </Nav.Link>
      {isLoggedIn ? (
        <NavDropdown title={<FaUserCircle />} id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => navigate("api/user/mypage")}>
            My Page
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => navigate("/settings")}>
            Settings
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Link as={Link} to="/api/user/login" onClick={onLinkClick}>
          Login
        </Nav.Link>
      )}
    </Nav>
  );
});

export default Test2;
