/* eslint-disable react/prop-types */

import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./Footer"; 
import NavigationBar from "./NavigationBar";

const AppLayout = ({ children }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh", marginTop: '100px'}}
    >
      <NavigationBar />
      <Container className="flex-fill" style={{ flex: "1"}}>
        {children} 
      </Container>
      <Footer />
    </div>
  );
};

export default AppLayout;
