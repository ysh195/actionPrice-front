/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Grid, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#2c3e50",
        color: "#ecf0f1",
        padding: "2rem 1rem",
        marginTop: "auto"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <img
              src={""}
              alt="logo"
              style={{ marginBottom: "1rem", width: "100px" }}
            />
            <Typography variant="body2">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">COMPANY</Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link
                href="#"
                sx={{
                  color: "#ecf0f1",
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
                  color: "#ecf0f1",
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
                  color: "#ecf0f1",
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
      <hr style={{ borderColor: "#ecf0f1" }} />
      <Typography variant="body2" align="center" sx={{ marginTop: "1rem" }}>
        © {new Date().getFullYear()} AuctionPrice. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
