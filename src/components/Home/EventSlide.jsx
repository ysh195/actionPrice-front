/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const EventSlide = ({ slideImages, error, loading }) => {
//   // Slider settings
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     pauseOnHover: true,
//   };

//   return (
//     <div
//       className="slider-container"
//       style={{
//         width: "90%",
//         maxWidth: "900px",
//         margin: "0 auto",
//         padding: "20px 0",
//       }}
//     >
//       <h1 style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
//         Event Highlights
//       </h1>
//       {slideImages.length > 0 ? (
//         <Slider {...settings}>
//           {slideImages.map((image, index) => (
//             <div key={index} style={{ position: "relative", padding: "10px" }}>
//               <div
//                 style={{
//                   position: "relative",
//                   overflow: "hidden",
//                   borderRadius: "10px",
//                   boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
//                   transition: "transform 0.3s",
//                 }}
//                 className="image-container"
//               >
//                 <img
//                   src={`data:image/jpeg;base64,${image.image}`}
//                   alt={`Slide ${index + 1}`}
//                   loading="lazy"
//                   style={{
//                     width: "100%",
//                     maxHeight: "450px",
//                     objectFit: "cover",
//                     transition: "transform 0.3s ease",
//                   }}
//                   className="slider-image"
//                 />
//                 {/* Optional Gradient Overlay */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: "100%",
//                     height: "100%",
//                     background:
//                       "linear-gradient(to top, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1))",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   className="gradient-overlay"
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       ) : (
//         <p style={{ textAlign: "center", color: "#555" }}>Loading images...</p>
//       )}
//     </div>
//   );
// };

// export default EventSlide;
import React from "react";
import Slider from "react-slick";
import { Box,} from "@mui/material";

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
