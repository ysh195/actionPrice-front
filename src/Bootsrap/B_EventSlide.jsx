import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const EventSlide = () => {
  const [slideImages, setSlideImages] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    // fade: true,
  };
  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/"); 
  
  
      const fetchedImages = Object.values(response.data.images);
          console.log("fetchedImages:",fetchedImages);
          
          console.log("Fetched images type:", Array.isArray(fetchedImages));
      setSlideImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="slider-container" style={{ margin: "0 auto" }}>
      <h1 className="slick-title">Event Slick Title</h1>
      <Slider {...settings}>
        {slideImages.map((image, index) => (
          <div key={index}>
            <img
              src={`data:image/jpeg;base64,${image}`}
              alt={`Slide ${index + 1}`}
              className="event-img"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default EventSlide;
