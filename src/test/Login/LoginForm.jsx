/* eslint-disable react/prop-types */
import React from "react";
import InputField from "./InputField";
import RememberMe from "./RememberMe";
import LoginButton from "./LoginButton";

const LoginForm = ({
  username,
  password,
  showPassword,
  errors,
  isLoading,
  handleLogin,
  toggleShowPassword,
  setUsername,
  setPassword,
  rememberMe,
  setRememberMe,
}
) => (
  
  <form
    onSubmit={handleLogin}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <InputField
      type="text"
      placeholder="사용자 이름을 입력하세요"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      isInvalid={!!errors.username}
      error={errors.username}
    />
    <InputField
      type={showPassword ? "text" : "password"}
      placeholder="비밀번호를 입력하세요"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      isInvalid={!!errors.password}
      error={errors.password}
      toggleShowPassword={toggleShowPassword}
    />
    <RememberMe
      checked={rememberMe}
      onChange={() => setRememberMe(!rememberMe)}
    />
    <LoginButton isLoading={isLoading} />
  </form>
);

export default LoginForm;
