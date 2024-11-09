/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from "@mui/material";

const AppLayout = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh" // Ensures the layout takes full height
    >
      <Navbar />

      <Box
        component="main"
        sx={{
          width: "80%",
          flex: 1, // Allows main to expand to push the footer down
          mx: "auto", // Centers the main content horizontally
          paddingY: 4, // Adjusts vertical padding
          
          minHeight: "calc(100vh - 64px)", // Subtracts the height of the navbar
        }}
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default AppLayout;
