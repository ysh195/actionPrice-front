/* eslint-disable no-unused-vars */
import React from "react";
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
import { login, logoutUser } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { colors } from '../assets/assest.js'; 


function Navbar() {
  const [navMenuOpen, setNavMenuOpen] = React.useState(null);
  const [userMenuOpen, setUserMenuOpen] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const { username, role } = useSelector((state) => state.login);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setNavMenuOpen(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setUserMenuOpen(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setNavMenuOpen(null);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/api/user/login");
  };

  const handleLogin = () => {
    dispatch(login());
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: colors.primary }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Menu Button for mobile */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={navMenuOpen}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(navMenuOpen)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="api/category/:large?/:middle?/:small?/:rank?"
                  sx={{ textDecoration: "none", color: "inherit" }}
                >
                  Category
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="api/contact-us"
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
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="api/category/:large"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Category
            </Button>
            <Button
              component={Link}
              to="api/contact-us"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Contact Us
            </Button>
          </Box>

          {/* User Menu */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              {/* //todo: change role !== 'ROLE_ADMIN' after the auth is done  */}
              {role !== "ROLE_ADMIN" && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button
                    component={Link}
                    to="/api/admin/userlist"
                    sx={{
                      textDecoration: "none",
                      color: "inherit",
                      marginRight: 1,
                    }}
                  >
                    Admin Page
                  </Button>
                </MenuItem>
              )}
              <Box>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ color: "white" }} />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={userMenuOpen}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(userMenuOpen)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      component={Link}
                      to={`/api/mypage/${username}`}
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      My Page
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      component={Link}
                      to="/api/user/wishlist"
                      sx={{ textDecoration: "none", color: "inherit" }}
                    >
                      WishList
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ color: colors.warning }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
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
