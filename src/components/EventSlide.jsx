/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { slide_images } from "../assets/assest";

// const EventSlide = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     pauseOnHover: true,
//     nextArrow: <Next />,
//     prevArrow: <Prev />,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           infinite: true,
//           dots: true,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="slider-container">
//       <h1 className="slick-title">Event Slick Title</h1>
//       <Slider {...settings}>
//         <img src={slide_images.meat} alt="Fresh meat" className="event-img" />
//         <img
//           src={slide_images.veggie2}
//           alt="Fresh vegetables"
//           className="event-img"
//         />
//         <img
//           src={slide_images.veggies}
//           alt="Assorted veggies"
//           className="event-img"
//         />
//       </Slider>
//     </div>
//   );
// };

// function Next(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "lightgray",
//         borderRadius: "50%",
//         padding: "15px",
//         cursor: "pointer",
//         position: "absolute",
//         right: "-40px",
//         zIndex: 1,
//       }}
//       onClick={onClick}
//     ></div>
//   );
// }

// function Prev(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{
//         ...style,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "lightgray",
//         borderRadius: "50%",
//         padding: "15px",
//         cursor: "pointer",
//         position: "absolute",
//         left: "-40px",
//         zIndex: 1,
//       }}
//       onClick={onClick}
//     ></div>
//   );
// }

// export default EventSlide;
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { slide_images } from "../assets/assest";

const EventSlide = () => {
  const settings = {
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
    <div
      className="slider-container"
      style={{ width: "80%", margin: "0 auto" }}
    >
      <h1 className="slick-title">Event Slick Title</h1>
      <Slider {...settings}>
        <img src={slide_images.meat} alt="Fresh meat" className="event-img" />
        <img
          style={{ borderRadius: "15px" }}
          src={slide_images.veggie2}
          alt="Fresh vegetables"
          className="event-img"
        />
        <img
          src={slide_images.veggies}
          alt="Assorted veggies"
          className="event-img"
          style={{
            border: "1px solid red",
            borderRadius: "15px",
          }}
        />
      </Slider>
    </div>
  );
};

function Next(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "lightgray",
        borderRadius: "50%",
        padding: "15px",
        cursor: "pointer",
        position: "absolute",
        right: "-40px",
        zIndex: 1,
      }}
      onClick={onClick}
    ></div>
  );
}

function Prev(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "lightgray",
        borderRadius: "50%",
        padding: "15px",
        cursor: "pointer",
        position: "absolute",
        left: "-40px",
        zIndex: 1,
      }}
      onClick={onClick}
    ></div>
  );
}

export default EventSlide;
