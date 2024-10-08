import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
  });
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 200) {
        setIsCodeSent(true);
        alert("Verification code sent to your email!");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Failed to send verification code. Please try again.");
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkVerificationCode",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          verificationCode: formData.verificationCode,
        }
      );

      if (response.status === 200) {
        setIsVerified(true);
        alert("Email verified successfully!");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Invalid verification code. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      alert("Please verify your email before submitting.");
      return;
    }

    try {
      // Replace with your registration API endpoint
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        // Optionally reset the form or redirect the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {isCodeSent && (
        <div>
          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <button type="submit">
        {isCodeSent ? "Verify Code" : "Send Verification Code"}
      </button>

      {isVerified && (
        <button onClick={handleSubmit} type="button">
          Register
        </button>
      )}
    </form>
  );
};

export default RegistrationForm;
