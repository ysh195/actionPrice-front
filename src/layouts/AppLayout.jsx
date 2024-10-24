/* eslint-disable react/prop-types */

import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import Navbar from "./NavBar";

const AppLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Container className="flex-fill" style={{ flex: "1" }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default AppLayout;
