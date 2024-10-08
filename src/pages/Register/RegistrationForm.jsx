import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
    if (Object.keys(validationErrors).length === 0) {
      // Submit form if no errors

      const formData = {
        username,
        password,
        email,
        verificationCode,
      };

      if (!isVerified) {
        alert("Please verify your email before submitting.");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Registration successful:", response.data);
        window.location.href = "api/user/login";

        if (response.status === 201) {
          alert("Registration successful!");
          // Optionally reset the form or redirect the user
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data);
        } else {
          setErrorMessage("등록 중 오류가 발생했습니다.");
        }
        console.error("Error during registration:", error);
        alert("Registration failed. Please try again.");
      }
      console.log("Form submitted:", { email, password });
      setErrorMessage({});
    } else {
      setErrorMessage(validationErrors);
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
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
