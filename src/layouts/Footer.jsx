/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { logo, colors } from "../assets/assest";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <Divider />
      <Box
        component="footer"
        sx={{
          padding: "0 3rem",
          position: "relative",
          bottom: 0,
          width: "100%",
          zIndex: 1,
          backgroundColor: colors.backgroundColor,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mx: "auto" }}
        >
          {/* Logo Section */}
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <img

              src={logo}
              alt="logo"
              style={{ width: "200px" }}
            />
          </Box>

          {/* Contact Info Section */}
          <Box textAlign="center" flex={1}>
            <Typography variant="body2">전화: +82-2222-1111 </Typography>
            <Typography variant="body2">이메일: contact@contact.com</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} AuctionPrice. All rights reserved.
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="flex-end">
            <Typography variant="body2">
              
              <h3>약관 및 정책</h3>
              <ul>
                <li><Link to={"/api/policies/termsAndCondition"}>이용 약관</Link></li>
                <li><Link to={"/api/policies/personalInfoPolicy"}>개인정보 처리방침</Link></li>
                <li><Link to={"/api/policies/operationalPolicy"}>운영정책</Link></li>
              </ul>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
