/* eslint-disable react/prop-types */
import React from "react";

const RememberMe = ({ checked, onChange }) => (
  <div style={{ marginBottom: "1rem" }}>
    <label>
      <input type="checkbox" checked={checked} onChange={onChange} />
      Remember me
    </label>
  </div>
);

export default RememberMe;
