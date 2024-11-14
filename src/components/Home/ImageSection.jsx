/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography } from "@mui/material";
import { w2 } from "../../assets/assest";

const ImageSection = () => {
  return (
    <Box
      sx={{
        margin: 2,
        borderRadius: "25px",
        // minHeight: "100vh",
        height: "70vh",
        display: "flex",
        backgroundImage: `url(${w2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
        backgroundColor: "#f9f7f1",
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            position: "absolute",
            top: "5%",
            paddingRight: 10,
            fontWeight: "bold",
            letterSpacing: "-0.02rem",
            color: "#00403d",
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1.5,
            marginTop: "2rem",
            fontFamily: "Noto Sans KR",
          }}
        >
          전국의 다양한 거래 정보를 한 눈에 확인하세요.
        </Typography>

        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            position: "absolute",
            top: "20%",
            paddingRight: 10,
            width: "70%",
            fontSize: { xs: "1.2rem", ms: "1.5rem", md: "2rem" },
            lineHeight: 1.5,
            marginTop: "1rem",
            fontFamily: "Noto Sans KR",
          }}
        >
          전국의 도매 시장에서 거래되는 채소, 축산물, 과일, 식량작물, 수산물,
          특용작물 등의 가격 데이터를 제공합니다.
        </Typography>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          height: "100%",
          marginTop: { xs: 4, md: 0 }, // Ensure there's space between text and images
        }}
      >
        {/* Lemon Image */}
        {/* <Box
            component="img"
            src={lemon}
            alt="Lemon Image"
            sx={{
              position: "absolute",
              top: { xs: "10%", md: "0" },
              left: "0",
              width: { xs: "60%", md: "50%" },
              height: "auto",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          /> */}
        {/* Tomato Image */}
        {/* <Box
            component="img"
            src={tomatobg}
            alt="Tomato Image"
            sx={{
              position: "absolute",
              top: { xs: "50%", md: "50%" },
              left: { xs: "20%", md: "50%" },
              width: { xs: "50%", md: "50%" },
              height: "auto",
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          /> */}
      </Box>
    </Box>
  );
};

export default ImageSection;
