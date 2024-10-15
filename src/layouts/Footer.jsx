import * as React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { icons } from "../assets/assest";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#C5705D ",
        color: "white",
        py: 4,
        position: "relative",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        {/* Logo Image */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            mb: 2,
          }}
        >
          <img
            src={""}
            alt="Company Logo"
            style={{ width: "150px", height: "auto", marginRight: "16px" }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Link href="#" color="inherit" sx={{ mx: 2 }}>
            Home
          </Link>
          <Link href="#about" color="inherit" sx={{ mx: 2 }}>
            About Us
          </Link>
          <Link href="#services" color="inherit" sx={{ mx: 2 }}>
            Services
          </Link>
          <Link href="#contact" color="inherit" sx={{ mx: 2 }}>
            Contact
          </Link>
        </Box>
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} AuctionPrice. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
