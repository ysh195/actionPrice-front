/* eslint-disable no-unused-vars */
import logo from "./images/logo.png";

import axios from "axios";

export const icons = {
  logo,
};

export const colors = {
  primary: "#2C3E50",
  secondary: "#2ecc71",
  accent: "#e74c3c",
  text: "#2c3e50",
  white: "#ffffff",
  white2: "#ecf0f1",
  tableHead: "#C5705D",
  button1: "#2C3E50",
  button2: "#CB6040",
  hover1: "#49557e",
  hover2: "#D76B4C",
  warning: "#d32f2f",
  paperb: "#F9F9F9",
  disable: "#d3d3d3",
};

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


const andminAnswers=[
  {}
]
