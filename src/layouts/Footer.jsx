/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { colors } from "../assets/assest";

const Footer = () => {
  return (
    <>
      <Divider />
      <Box
        component="footer"
        sx={{
          padding: "2rem 1rem",
          marginTop: "auto",
          position: "relative",
          bottom: 0,
          width: "100%",
          zIndex: 1000,
          height: "100px",
          mb: 1,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mx: "auto" }}
        >
          {/* Logo Section */}
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <img
              src={""}
              alt="logo"
              style={{ width: "100px", marginBottom: "1rem" }}
            />
          </Box>

          {/* Contact Info Section */}
          <Box textAlign="center" flex={1}>
            <Typography variant="body2">전화: +82-2222-1111 </Typography>
            <Typography variant="body2">이메일: contact@contact.com</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} AuctionPrice. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
