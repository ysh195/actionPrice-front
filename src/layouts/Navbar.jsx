import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, logout } from "../redux/slices/loginSlice";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = async () => {
    try {
      // Ensure FormData is defined correctly
      await dispatch(login(FormData)).unwrap();
      navigate("/"); // Navigate after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/api/user/login");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#C5705D" }}>
      {/*  #6A9C89, #024950, #E85A4F #CD5C08*/}
      <Box>
        <Toolbar>
          {/* Logo Name */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            AuctionPrice
          </Typography>
          {/* responsive menu div */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            {/* responsive menu icon div*/}
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* responsive menu*/}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <Button
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                  component={Link}
                  to="/"
                >
                  Home
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                  component="a"
                  to="#categories" // Use Link for smooth scroll
                >
                  Categories
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    backgroundColor: "inherit",
                  }}
                  component={Link}
                  to="/contact-us"
                >
                  Contact Us
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          {/* responsive menu logo title*/}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "inherit",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              // border: "1px solid red",
            }}
          >
            AuctionPrice
          </Typography>
          {/* nav menu page name div*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component="a"
              href="#categories"
            >
              Categories
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/contact-us"
            >
              Contact Us
            </Button>
          </Box>
          {/* menu right icons */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <MenuItem>
              {/* notification icon */}
              <IconButton
                // onClick={handleOpenNotification}
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MenuItem>
            {/* favorite heart menu */}
            <MenuItem>
              <IconButton
                // onClick={handleOpenwishList}
                size="large"
                aria-label="wishlist"
                color="inherit"
              >
                <FavoriteIcon />
              </IconButton>
            </MenuItem>
            <MenuItem>
              {/* user circle icon */}
              <IconButton
                onClick={handleOpenUserMenu}
                size="large"
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </MenuItem>
          </Box>

          {isLoggedIn ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/api/user/login")} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Navbar;
