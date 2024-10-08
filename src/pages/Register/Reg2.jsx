import React, { useState } from "react";
import "./Reg2.css";

const Reg2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      newErrors.username = "Username is required";
    } else if (username.length < 6) {
      newErrors.password = "Username must be at least 6 characters";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (isCodeSent && !verificationCode) {
      newErrors.verificationCode = "Verification Code is required";
    }

    return newErrors;
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to send the verification code
      console.log("Sending verification code...");
      setIsCodeSent(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Proceed to verify the code
      console.log("Verifying code...");
      setIsVerified(true);
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={isCodeSent ? handleVerifyCode : handleSendCode}>
      <div>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          // required
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>

      <div>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          // required
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>

      <div>
    
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          // required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      {isCodeSent && (
        <div>
          <input
            type="text"
            id="verificationCode"
            name="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Verification Code"
            // required
          />
          {errors.verificationCode && (
            <p style={{ color: "red" }}>{errors.verificationCode}</p>
          )}
        </div>
      )}

      <button type="submit">
        {isCodeSent ? "Verify Code" : "Send Verification Code"}
      </button>

      {isVerified && (
        <button onClick={() => console.log("Registering...")} type="button">
          Register
        </button>
      )}
    </form>
  );
};

export default Reg2;
