/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const EventSlide = () => {
  const [images, setImages] = useState([]);

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const fetchedImages = Object.values(response.data.images); // Convert object to array
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Slider settings
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
    <div
      className="slider-container"
      style={{ width: "80%", margin: "0 auto" }}
    >
      <h1>Event Slick Title</h1>
      {images.length > 0 ? (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={`data:image/jpeg;base64,${image}`}
                alt={`Slide ${index + 1}`}
                className="event-img"
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default EventSlide;
