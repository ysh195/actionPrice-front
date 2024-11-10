/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const AppLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          width: "100%",
          flex: 1, // Allows main to expand to push the footer down
          mx: "auto", // Centers the main content horizontally
          minHeight: "calc(100vh - 64px)", // Subtracts the height of the navbar
          px: { xs: 2, sm: 4 },
          py: 4,
          backgroundColor: "#fafafa",
          // backgroundColor: "#f5f5f5",
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
