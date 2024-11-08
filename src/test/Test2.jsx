/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../assets/assest";
import { logoutUser } from "../redux/slices/loginSlice";

function Navbar() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  // const username = useSelector((state) => state.login.username);
  const username = localStorage.getItem("username");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleNavMenu = () => {
    setNavMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    setUserMenuOpen(false);
    navigate("/api/user/login");
  };

  const handleLogin = () => {
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: colors.primary }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={toggleNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              open={navMenuOpen}
              onClose={toggleNavMenu}
              id="menu-appbar"
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={toggleNavMenu}>
                <Typography
                  component={Link}
                  to="/"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={toggleNavMenu}>
                <Typography
                  component={Link}
                  to="/category"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Category
                </Typography>
              </MenuItem>
              <MenuItem onClick={toggleNavMenu}>
                <Typography
                  component={Link}
                  to="/api/contact-us"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Contact Us
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo Positioned on the Left for Desktop */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              AuctionPrice
            </Typography>
          </Box>

          {/* Desktop Menu Items */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              component={Link}
              to="/"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/category"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Category
            </Button>
            <Button
              component={Link}
              to="/api/contact-us"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact Us
            </Button>
          </Box>

          {/* User Menu */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={toggleUserMenu} sx={{ p: 0 }}>
                <AccountCircle sx={{ color: "white" }} />
              </IconButton>

              <Menu
                open={userMenuOpen}
                onClose={toggleUserMenu}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={toggleUserMenu}>
                  <Typography
                    component={Link}
                    to={`/api/mypage/${username}`}
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    My Page
                  </Typography>
                </MenuItem>
                <MenuItem onClick={toggleUserMenu}>
                  <Typography
                    component={Link}
                    to="/api/user/wishlist"
                    sx={{ textDecoration: "none", color: "inherit" }}
                  >
                    WishList
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ color: colors.warning }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/api/user/login"
              onClick={handleLogin}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
