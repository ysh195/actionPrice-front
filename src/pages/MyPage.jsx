import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/loginSlice"; 
import { useNavigate } from "react-router-dom";
import "../css/MyPage.css";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("personalInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const username = useSelector((state) => state.login.username);
        const access_token = useSelector((state) => state.login.access_token);
    console.log(username)


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
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
            <h4>Personal Information</h4>
            <p>Name: {username || "Not provided"}</p>
            <p>Email: john.doe@example.com</p>
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

      case "myPosts":
        return (
          <div>
            <h4>Your Posts</h4>
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
            <button onClick={handleLogout} className="danger-button">
              Confirm Logout
            </button>
          </div>
        );

      case "deleteUser":
        return (
          <div>
            <h4>Delete Account</h4>
            <p>Are you sure you want to delete your profile?</p>
            <button onClick={withdrawMembership} className="danger-button">
              Confirm Withdrawal
            </button>
          </div>
        );
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="user-profile-container">
      <div className="sidebar">
        <button
          onClick={() => handleTabClick("personalInfo")}
          className="tab-button"
        >
          Personal Info
        </button>
        <button
          onClick={() => handleTabClick("wishlist")}
          className="tab-button"
        >
          Wishlist
        </button>
        <button onClick={() => handleTabClick("myPosts")} className="tab-button">
          My Posts
        </button>
        <button onClick={() => handleTabClick("logout")} className="tab-button">
          Logout
        </button>
        <button
          onClick={() => handleTabClick("deleteUser")}
          className="tab-button"
        >
          Delete Account
        </button>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default MyPage;
