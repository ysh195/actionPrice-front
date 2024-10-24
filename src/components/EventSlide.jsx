import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../css/EventSlide.css"; // Ensure this file exists

const EventSlide = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Automatically change slide every 4 seconds
  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]); // Dependency on images.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  return (
    <div className="slider-container">
      <h1>Event Slick Title</h1>
      <div className="slider">
        {images.length > 0 ? (
          <img
            src={`data:image/jpeg;base64,${images[currentSlide]}`} // Adjust this based on your data structure
            alt={`Slide ${currentSlide + 1}`}
            className="event-img"
            loading="lazy"
          />
        ) : (
          <p>Loading images...</p>
        )}
      </div>

      <button
        className="prev"
        onClick={prevSlide}
        disabled={images.length === 0}
      >
        ❮
      </button>

      <button
        className="next"
        onClick={nextSlide}
        disabled={images.length === 0}
      >
        ❯
      </button>
    </div>
  );
};

export default EventSlide;
