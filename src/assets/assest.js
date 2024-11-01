/* eslint-disable no-unused-vars */
import logo from "./images/logo.png";
import veggies from "./images/veggies.jpg";
import veggie2 from "./images/veggie2.jpg";
import egg1 from "./images/egg1.jpg";
import dairy from "./images/dairy.jpg";
import pork from "./images/pork.jpg";
import axios from "axios";

export const icons = {
  logo,
};

// export const slide_images = {
//   veggies,
//   veggie2,
//   egg1,
//   dairy,
//   pork,
// };

  const response = await axios.get("http://localhost:8080/");
  const fetchedImages = response.data.images;

  export const largeCategoryList = [
    { id: 1, name: "채소류", image: fetchedImages.meat },
    { id: 2, name: "축산물", image: fetchedImages.egg },
    { id: 3, name: "과일류", image: fetchedImages.cookie },
    { id: 4, name: "식량작물", image: fetchedImages.veggie },
    { id: 5, name: "수산물", image: fetchedImages.veggie },
    { id: 6, name: "특용작물", image: fetchedImages.salted },
  ];
