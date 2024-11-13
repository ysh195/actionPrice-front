/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Link as MUILink,
  IconButton,
} from "@mui/material";
import { logo, colors } from "../assets/assest";
import { Link } from "react-router-dom";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Check scroll position to toggle "Back to Top" visibility
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      const windowBottom = scrollPosition + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show icon when user scrolls near the bottom of the page
      setShowBackToTop(windowBottom >= documentHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll back to top on button click
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Divider
        sx={{
          height: "3px",
          backgroundColor: colors.rose,
        }}
      />
      <Box
        component="footer"
        sx={{
          backgroundColor: "#f9f7f1",
          py: 2,
          px: { xs: 2, md: 6 },
          color: "#444",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: { xs: "center", md: "left" },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "150px", maxWidth: "100%" }}
          />
        </Box>

        {/* Contact Info Section */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: colors.brown, mb: 1 }}
          >
            Contact Us
          </Typography>

          {/* Phone Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
              mb: 0.5,
            }}
          >
            <LocalPhoneIcon fontSize="small" sx={{ color: "#777" }} />
            <Typography
              variant="body2"
              sx={{ fontSize: "0.95rem", color: colors.footerText }}
            >
              +82-2222-1111
            </Typography>
          </Box>

          {/* Email Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <EmailIcon fontSize="small" sx={{ color: "#777" }} />
            <Typography
              variant="body2"
              sx={{ fontSize: "0.95rem", color: colors.footerText }}
            >
              contact@contact.com
            </Typography>
          </Box>

          <Typography
            variant="body2"
            sx={{ mt: 2, fontSize: "0.9rem", color: colors.footerText }}
          >
            © {new Date().getFullYear()} AuctionPrice. All rights reserved.
          </Typography>
        </Box>

        {/* Policies Section */}
        <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, color: colors.brown, mb: 1 }}
          >
            약관 및 정책
          </Typography>
          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, mt: 1 }}>
            <Box component="li" sx={{ my: 0.5 }}>
              <MUILink
                component={Link}
                to={"/api/policies/termsAndCondition"}
                sx={{
                  color: colors.footerText,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
                underline="hover"
              >
                이용 약관
              </MUILink>
            </Box>
            <Box component="li" sx={{ my: 0.5 }}>
              <MUILink
                component={Link}
                to={"/api/policies/personalInfoPolicy"}
                sx={{
                  color: colors.footerText,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
                underline="hover"
              >
                개인정보 처리방침
              </MUILink>
            </Box>
            <Box component="li" sx={{ my: 0.5 }}>
              <MUILink
                component={Link}
                to={"/api/policies/operationalPolicy"}
                sx={{
                  color: colors.footerText,
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }}
                underline="hover"
              >
                운영정책
              </MUILink>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Back to Top Button */}
      {showBackToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 40,
            right: 40,
            backgroundColor: "#d3817a",
            color: "white",
            "&:hover": {
              backgroundColor: "#d3817a",
            },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </>
  );
};

export default Footer;
