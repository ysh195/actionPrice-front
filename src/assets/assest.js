import axios from "axios";
import logo from "./logo.png";
import whiteLogo from "./whiteLogo.png";
import textLogo2 from "./textLogo2.png";

import egg from "./images/egg.jpeg";
import lemon from "./images/lemon.jpeg";
import tomatobg from "./images/tomatobg.jpeg";
import w1 from "./images/w1.jpeg";
import w2 from "./images/w2.jpeg";
import w3 from "./images/w3.jpeg";
import w4 from "./images/w4.jpeg";
import w5 from "./images/w5.jpeg";
import w6 from "./images/w6.jpeg";
import gradient3 from "./images/gradient3.jpeg";

export {
  logo,
  whiteLogo,
  textLogo2,
  tomatobg,
  gradient3,
  lemon,
  egg,
  w1,
  w2,
  w3,
  w4,
  w5,
  w6,
};

//desc: ui colors
export const colors = {
  primary: "#00403d",

  secondary: "#2ecc71",
  accent: "#e74c3c",
  text: "#2c3e50",
  white: "#ffffff",
  white2: "#ecf0f1",

  button1: "#2C3E50",
  button2: "#CB6040",
  hover1: "#49557e",
  hover2: "#a45f53",
  warning: "#d32f2f",

  paperbeige: "#F7F2EF",
  disable: "#d3d3d3",

  border: "#0c1e2a",
  link: "#8C6A4A",
  // backgroundColor: "#f8f3e8",
  // backgroundColor: "#F0F5F4",
  tableHead: "#a45f53",
  brown: "#7b482d",
  footerText: "#a45f53",
  buttonBorder: "#d3817a",
  rose: "#d3817a",

  green: "#00403d",

  darkBrown: "#4B2C20",

  backgroundColor: " #f8f8f8",
  gray: "#dedad7",
  page1: "#f2eee6",
  tableBackground: "#faf7f2",
};

const response = await axios.get("http://localhost:8080/");
const fetchedImages = response.data.images;

export const largeCategoryList = [
  { id: 1, name: "채소류", image: fetchedImages.ve },
  { id: 2, name: "축산물", image: fetchedImages.meat },
  { id: 3, name: "과일류", image: fetchedImages.fruit },
  { id: 4, name: "식량작물", image: fetchedImages.crop },
  { id: 5, name: "수산물", image: fetchedImages.fish },
  { id: 6, name: "특용작물", image: fetchedImages.scrop },
];

//desc: admin answer list
export const adminAnswers = [
  { id: 1, answerType: "AI", text: "It's an answer by chat-gpt" },
  {
    id: 2,
    answerType: "RECEIVED_INQUIRY",
  },
  {
    id: 3,
    answerType: "PROCESSING_IN_PROGRESS",
  },
  {
    id: 4,
    answerType: "PROVIDE_SOLUTION",
  },
  {
    id: 5,
    answerType: "APOLOGIZE_FOR_SERVCIE_DELAY",
  },
  {
    id: 6,
    answerType: "REQUEST_ADDITIONAL_INFO",
  },
];
