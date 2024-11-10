/* eslint-disable react/prop-types */
import React from "react";
import Slider from "react-slick";
import { Box } from "@mui/material";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventSlide = ({ slideImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "30px auto",
        borderRadius: "15px",
      }}
    >
      <Slider {...settings}>
        {slideImages.map((image, index) => (
          <Box
            key={index}
            sx={{
              position: "relative",
              height: { xs: 300, md: 500 },
              overflow: "hidden",
              borderRadius: "15px",
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
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.4) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default EventSlide;
