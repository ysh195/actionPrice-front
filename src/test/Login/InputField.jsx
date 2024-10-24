/* eslint-disable react/prop-types */
import React from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  isInvalid,
  showPassword,
  toggleShowPassword,
  error,
}) => {
  console.log("Input type:", type);


  return (
    
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ position: "relative" }}>
        <input
        
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            padding: "0.5rem",
            paddingRight: "40px", // Space for the icon
            border: isInvalid ? "1px solid red" : "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      
        {type === "password" && (
          <button
            onClick={toggleShowPassword}
            type="button" // Prevents form submission
            style={{
              border: "1px solid red",
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              background: "none",
              // border: "none",
              cursor: "pointer",
              padding: "0",
              outline: "none",
            }}
            aria-label="Toggle password visibility"
          >
            {/* {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />} */}

            {showPassword ? "show" : "hide"}
          </button>
        )}
      </div>
      {isInvalid && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default InputField;
