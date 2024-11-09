/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";
import { colors } from "../assets/assest";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.primary,
        color: colors.white2,
        padding: "2rem 1rem",
        marginTop: "auto",
        position: "relative",
        bottom: 0, // Makes it stick to the bottom of the page
        width: "100%", // Ensures full width
        zIndex: 1000, // Makes sure it's above other elements if needed
        boxShadow: "0px -2px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box display="flex" alignItems="flex-start">
            <img
              src={""}
              alt="logo"
              style={{ marginBottom: "1rem", width: "100px" }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">COMPANY</Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link
                href="#"
                sx={{
                  color: colors.white2,
                  "&:hover": { textDecoration: "underline", color: "#3498db" },
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                sx={{
                  color: colors.white2,
                  "&:hover": { textDecoration: "underline", color: "#3498db" },
                }}
              >
                Contact us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                sx={{
                  color: colors.white2,
                  "&:hover": { textDecoration: "underline", color: "#3498db" },
                }}
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">GET IN TOUCH</Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>+82-2222-1111</li>
            <li>contact@contact.com</li>
          </ul>
        </Grid>
      </Grid>
      <hr style={{ borderColor: colors.white2 }} />
      <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
        © {new Date().getFullYear()} AuctionPrice. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
