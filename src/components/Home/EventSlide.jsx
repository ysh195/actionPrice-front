/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { colors, newImageList,  gradient3, } from "../../assets/assest";

const DarkGreenPage = ({ slideImages }) => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh", // Full height of the viewport
        padding: 5,
        margin: 2,
        borderRadius: "25px",
        position: "relative",
        backgroundColor: colors.page1,
      }}
    >
      <Typography
        sx={{
          width: "50%",
          fontFamily: "Quicksand, sans-serif",
          fontWeight: 600,
          fontSize: "2rem", // Increase font size
          lineHeight: 1.6,
          color: colors.green,
          letterSpacing: "-0.02rem",
          position: "absolute",
          
          top:{xs: 1, md:"10%"},
          zIndex: 1,
        }}
      >
        저희 서비스는 주요 시장에서 매일 수집한 다양한 필수 품목들의 가격 정보를
        제공합니다.
      </Typography>

      <div
        className="slider-container"
        style={{
          maxWidth: "100%",
          margin: "15rem auto",
          // backgroundColor: "#00403d",
          height: "450px", // Slider height
          alignContent: "center",
          zIndex: 2,
          borderRadius: "15px",
        }}
      >
        {/* <Slider {...settings}>
          {slideImages.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: "400px",
                overflow: "hidden",
                padding: "10px",
              }}
            >
              <img
                src={`data:image/jpeg;base64,${image.image}`}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Slider> */}

        <Slider {...settings}>
          {newImageList.map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                height: "350px",
                overflow: "hidden",
                padding: "5px",
                borderRadius: "15px",
                backgroundColor: "#00403d",
              }}
            >
              <img
                src={`${image.image}`}
                alt={`Slide ${index + 1}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background:
                    "linear-gradient(180deg, rgba(0, 69, 69, 0.1), rgba(0, 64, 61, 0.4))",
                  borderRadius: "15px",
                }}
              />
            </Box>
          ))}
        </Slider>
      </div>
    </Box>
  );
};

export default DarkGreenPage;
