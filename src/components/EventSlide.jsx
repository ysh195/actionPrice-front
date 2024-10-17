import React, { useEffect } from "react";
import Slider from "react-slick";
import { slide_images } from "../assets/assest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const EventSlide = () => {

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
    // fade: true,

  };

  return (
    <div className="slider-container" style={{ margin: "0 auto" }}>
      <h1 className="slick-title">Event Slick Title</h1>
      <Slider {...settings}>
        <div>
          <img src={slide_images.meat} alt="Fresh meat" className="event-img" />
        </div>
        <div>
          <img
            src={slide_images.veggie2}
            alt="Fresh veggies"
            className="event-img"
          />
        </div>
        <div>
          <img
            src={slide_images.veggies}
            alt="Various vegetables"
            className="event-img"
          />
        </div>
        <div>
          <img
            src={slide_images.pork}
            alt="Various vegetables"
            className="event-img"
          />
        </div>
        <div>
          <img
            src={slide_images.dairy}
            alt="Various vegetables"
            className="event-img"
          />
        </div>
      </Slider>
    </div>
  );
};

export default EventSlide;
