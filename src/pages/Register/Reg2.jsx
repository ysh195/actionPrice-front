import React, { useState } from "react";
import axios from "axios";
import "./Reg2.css"
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 6) {
      newErrors.username = "Username must be at least 6 characters";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    return newErrors;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        {
          username,
          email,
          password,
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
          username,
          password,
          email,
          verificationCode,
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
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }

    if (!isVerified) {
      alert("Please verify your email before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        {
          username,
          password,
          email,
          verificationCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/api/user/login")
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage("An error occurred during registration.");
      }
      console.error("Error during registration:", error);
    }
  };

  const renderErrorMessage = (field) => {
    return errorMessage[field] ? (
      <span style={{ color: "red" }}>{errorMessage[field]}</span>
    ) : null;
  };

  return (
    <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
      <div>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
            setErrorMessage({ ...errorMessage, username: null });
          }}
        />
        {renderErrorMessage("username")}
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrorMessage({ ...errorMessage, password: null });
          }}
         
        />
        {renderErrorMessage("password")}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrorMessage({ ...errorMessage, email: null });
          }}
         
        />
        {renderErrorMessage("email")}
      </div>

      {isCodeSent && (
        <div>
          <label htmlFor="verificationCode">Verification Code:</label>
          <input
            type="text"
            id="verificationCode"
            placeholder="Verification Code"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          
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
