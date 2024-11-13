/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import { colors } from "../assets/assest";

const AppLayout = ({ children }) => {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f9f7f1",
        }}
      >
        <Navbar />
        <Box
          component="main"
          sx={{
            backgroundColor: "#f9f7f1",
            width: "100%",
            flex: 1, // Allows main to expand to push the footer down
            mx: "auto", // Centers the main content horizontally
            px: { xs: 2, sm: 4 },
       
          }}
        >
          {children}
        </Box>

        <Footer />
      </Box>
    </>
  );
};

export default AppLayout;
