import * as React from "react";
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
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { login, logoutUser } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/api/user/login");
  };

  const handleLogin = () => {
    dispatch(login());
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#FFEC9F", color: "#2b2a28", height: "5rem" }}
    >
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
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/"
                  sx={{
                    textAlign: "center",
                    color: "#2b2a28",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/category"
                  sx={{
                    textAlign: "center",
                    color: "#2b2a28",
                    textDecoration: "none",
                  }}
                >
                  Category
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  component={Link}
                  to="/api/user/contact-us"
                  sx={{
                    textAlign: "center",
                    color: "#2b2a28",
                    textDecoration: "none",
                  }}
                >
                  Contact Us
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          {/* Logo Positioned on the Right for Desktop */}
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
              to="/" // Home path
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#2b2a28",
                textDecoration: "none",
              }}
            >
              AuctionPrice
            </Typography>
          </Box>

          {/* Mobile Logo Centered */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/" // Home path
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".1rem",
                color: "#2b2a28",
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
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/category"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              Category
            </Button>
            <Button
              component={Link}
              to="/api/user/contact-us"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              Contact Us
            </Button>
          </Box>

          {/* User Menu */}
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle sx={{ color: "#2b2a28" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": { backgroundColor: "#FFEC9F" }, // Change this to your desired background color
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    to="/api/user/mypage"
                    sx={{
                      textAlign: "center",
                      color: "#2b2a28",
                      textDecoration: "none",
                    }}
                  >
                    My Page
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    component={Link}
                    to="/api/user/wishlist"
                    sx={{
                      textAlign: "center",
                      color: "#2b2a28",
                      textDecoration: "none",
                    }}
                  >
                    WishList
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography sx={{ textAlign: "center", color: "#2b2a28" }}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              component={Link}
              to="/api/user/login"
              onClick={handleLogin}
              sx={{ my: 2, color: "inherit", display: "block" }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
