import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { slide_images } from "../assets/assest";
import Image from "react-bootstrap/Image";

const EventSlide = () => {
  return (
    <div className="slider-container" style={{ margin: "0 auto" }}>
      <h1 className="slick-title">Event Slick Title</h1>
      <Carousel style={{ borderRadius: "15px" }}>
        <Carousel.Item>
          <img src={slide_images.meat} alt="Fresh meat" className="event-img" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide_images.veggie2} className="event-img" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={slide_images.veggies} className="event-img" />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default EventSlide;
