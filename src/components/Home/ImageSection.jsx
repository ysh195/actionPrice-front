/* eslint-disable no-unused-vars */
import React from "react";
import { Box, Typography } from "@mui/material";
import { w2 } from "../../assets/assest";

const ImageSection = () => {
  return (
    <Box
      sx={{
        padding: 5,
        margin: 2,
        borderRadius: "25px",
        minHeight: "100vh",
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
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            paddingTop: 3,
            paddingLeft: 10,
            fontWeight: "bold",
            letterSpacing: "-0.02rem",
            color: "#00403d",
            fontSize: { xs: "2rem", md: "3rem" },
            lineHeight: 1.5,
            marginTop: "2rem",
            fontFamily: "Noto Sans KR",
          }}
        >
          우리의 독점 제품을 만나보세요
        </Typography>

        <Typography
          variant="h4"
          sx={{
            paddingLeft: 10,
            width: "70%",
            fontSize: { xs: "1.2rem", ms: "1.5rem", md: "2rem" },
            lineHeight: 1.5,
            marginTop: "1rem",
            fontFamily: "Noto Sans KR",
          }}
        >
          채소류, 축산물, 과일류, 식량작물, 수산물, 특용작물 등 다양한
          카테고리의 가격 데이터를 여러 출처에서 수집하여 최신 시장 동향을
          반영한 정확한 정보를 전달합니다.
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
