import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#C5705D",
        color: "white",
        padding: "2rem 0",
      }}
    >
      <Container>
        {/* Logo Image */}
        <Row className="mb-3">
          <Col className="text-center">
            <img
              src={""} // Replace with your logo source
              alt="Company Logo"
              style={{ width: "150px", height: "auto" }}
            />
          </Col>
        </Row>

        {/* Navigation Links */}
        <Row className="mb-3 justify-content-center">
          <Nav>
            <Nav.Link href="#" className="text-white mx-3">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="text-white mx-3">
              About Us
            </Nav.Link>
            <Nav.Link href="#services" className="text-white mx-3">
              Services
            </Nav.Link>
            <Nav.Link href="#contact" className="text-white mx-3">
              Contact
            </Nav.Link>
          </Nav>
        </Row>

        {/* Copyright Text */}
        <Row>
          <Col>
            <p className="text-center" style={{ margin: 0 }}>
              © {new Date().getFullYear()} AuctionPrice. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
