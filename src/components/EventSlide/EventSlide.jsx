/* eslint-disable react/prop-types */
import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EventSlide.css";
import { slide_images } from "../../assets/assest";

function Next(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "lightgray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function Prev(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "lightgray",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const EventSlide = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    nextArrow: <Next />,
    prevArrow: <Prev />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h1 className="slick-title">Event Slick Title</h1>
      <Slider {...settings}>
        <img src={slide_images.meat} alt="" className="event-img" />

        <img src={slide_images.veggie2} alt="" className="event-img" />

        <img src={slide_images.veggies} alt="" className="event-img" />
      </Slider>
    </div>
  );
};

export default EventSlide;
