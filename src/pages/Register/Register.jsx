import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreedPersonal, setAgreedPersonal] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const verificationCodeRef = useRef(null);
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setEmailError("Invalid email format.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/sendVerificationCode",
        { username, email, password }
      );

      if (response.status === 200) {
        setIsCodeSent(true);
        alert("Verification code sent to your email!");
      }
    } catch (error) {
      console.error("Error sending verification code:", error.response.data);
      alert(error.response.data);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/checkVerificationCode",
        { username, email, password, verificationCode }
      );
      console.log(response);

      if (response.status === 200) {
        setIsVerified(true);
        alert(response.data);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("Invalid verification code. Please try again.");
    }
  };

  const onRegisterButtonClickHandler = async (e) => {
    e.preventDefault();

    if (!username) {
      setUsernameError("Username is required.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (!agreedPersonal) {
      alert("You must agree to the terms.");
      return;
    }

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
      console.log(response);

      if (response.status === 200) {
        alert("Registration successful!");
        navigate("/api/user/login");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Registration failed. Please try again."
      );
      console.error("Error during registration:", error);
    }
  };

  return (
    <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
      <div>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {usernameError && <p>{usernameError}</p>}
      </div>

      <div>
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <p>{passwordError}</p>}
      </div>

      <div>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p>{emailError}</p>}
      </div>

      {isCodeSent && (
        <div>
          <input
            ref={verificationCodeRef}
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            hidden={!isCodeSent} // Disabled until code is sent
            required
          />
        </div>
      )}

      <button type="submit">
        {isCodeSent ? "Verify Code" : "Send Verification Code"}
      </button>

      {isVerified && (
        <>
          <div>
            <input
              type="checkbox"
              checked={agreedPersonal}
              onChange={() => setAgreedPersonal(!agreedPersonal)}
            />
            <span>I agree to the terms</span>
          </div>
          <button onClick={onRegisterButtonClickHandler} type="button">
            Register
          </button>
        </>
      )}

      <div>
        <span>Already have an account? </span>
        <span onClick={() => navigate("/login")}>Login</span>
      </div>
    </form>
  );
};

export default RegistrationForm;
