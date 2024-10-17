import React, { useState } from "react";
import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/api/user/login");
  };

    const withdrawMembership = () => {
      dispatch(withdrawMembership());
      navigate("/api/user/withdraw");
    };

  const renderContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <div>
            <h4>개인 정보</h4>
            <p>성명: John Doe</p>
            <p>이메일: john.doe@example.com</p>
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
            <Button variant="danger" onClick={handleLogout}>
              로그아웃 확인
            </Button>
          </div>
        );

      case "deleteUser":
        return (
          <div>
            <h4>회원탈퇴</h4>
            <p>Are you sure you want to delete you profile?</p>
            <Button variant="danger" onClick={withdrawMembership}>
              회원탈퇴 확인
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
              variant="outline-secondary"
              onClick={() => handleTabClick("personalInfo")}
              className="mb-2"
            >
              개인 정보
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => handleTabClick("wishlist")}
              className="mb-2"
            >
              Wishlist
            </Button>
            <Button
              variant="outline-info"
              onClick={() => handleTabClick("logout")}
              className="mb-2"
            >
              로그아웃
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => handleTabClick("deleteUser")}
              className="mb-2"
            >
              회원탈퇴
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
