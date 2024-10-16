import React, { useState } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <div>
            <h4>Personal Information</h4>
            <p>Name: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +1234567890</p>
          </div>
        );
      case "wishlist":
        return (
          <div>
            <h4>Your Wishlist</h4>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
            </ul>
          </div>
        );
      case "logout":
        return (
          <div>
            <h4>Logout</h4>
            <p>Are you sure you want to log out?</p>
            <Button variant="danger" onClick={() => alert("Logged out!")}>
              Confirm Logout
            </Button>
          </div>
        );
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <Container className="py-5 mt-5">
      <Row>
        <Col md={3}>
          <Nav className="flex-column">
            <Button
              variant="outline-primary"
              onClick={() => handleTabClick("personalInfo")}
              className="mb-2"
            >
              Personal Information
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleTabClick("wishlist")}
              className="mb-2"
            >
              Wishlist
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleTabClick("logout")}
              className="mb-2"
            >
              Logout
            </Button>
          </Nav>
        </Col>
        <Col md={9}>
          <div className="border p-3">{renderContent()}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
