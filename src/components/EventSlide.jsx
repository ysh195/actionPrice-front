import React, { useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { slide_images } from "../assets/assest";


const EventSlide = () => {
  useEffect(() => {
    // all images in your carousel are loaded before they are displayed.
    const preloadImages = () => {
      //Retrieve Image URLs
      const imageUrls = Object.values(slide_images);
      const imagePromises = imageUrls.map((src) => {
        return new Promise((resolve) => {
          const img = new Image(); // Create an img element
          img.src = src;
          img.onload = resolve; // Resolve the promise when the image loads
        });
      });

      // Wait for all images to preload
      Promise.all(imagePromises).then(() => {
        console.log("All images preloaded");
      });
    };

    preloadImages();
  }, []);

  return (
    <div className="slider-container" style={{ margin: "0 auto" }}>
      <h1 className="slick-title">Event Slick Title</h1>
      <Carousel interval={4000} fade style={{ borderRadius: "15px" }}>
        <Carousel.Item>
          <img src={slide_images.meat} alt="Fresh meat" className="event-img" />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={slide_images.veggie2}
            alt="Fresh veggies"
            className="event-img"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={slide_images.veggies}
            alt="Various vegetables"
            className="event-img"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default EventSlide;


