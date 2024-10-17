import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/loginSlice";
import { FaHeart, FaBell, FaUserCircle } from "react-icons/fa";
import { GrLogout } from "react-icons/gr";
import { MdOutlineFavorite } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";




function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false); // Close the navbar on link click
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/api/user/login");
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      className="custom-navbar"
      style={{ backgroundColor: "#c5705d", height: "4rem" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          AuctionPrice
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded((prev) => !prev)}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>
              Home
            </Nav.Link>
            <Nav.Link href="#categories" onClick={handleLinkClick}>
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/contact-us" onClick={handleLinkClick}>
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link>
              <FaBell style={{ color: "white" }} />
            </Nav.Link>
            <Nav.Link>
              <FaHeart style={{ color: "white" }} />
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                title={<FaUserCircle style={{ color: "white" }} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item onClick={() => navigate("api/user/mypage")}>
                  <FaRegUserCircle className="mr-2" />
                  My Page
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/settings")}>
                  <MdOutlineFavorite className="mr-2" />
                  Wishlist
                </NavDropdown.Item>

                <NavDropdown.Item onClick={handleLogout}>
                  <GrLogout className="mr-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link
                as={Link}
                to="/api/user/login"
                onClick={handleLinkClick}
              >
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;
