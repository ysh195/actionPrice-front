/* eslint-disable no-unused-vars */

import axios from "axios";
import logo from "./logo.png";
import whiteLogo from "./whiteLogo.png";
import textLogo2 from "./textLogo2.png";
import pear from "./images/pear.jpeg";
import banana from "./images/banana.jpeg";
import berry from "./images/berry.jpeg";
import pepper from "./images/pepper.jpeg";
import walnut from "./images/walnut.jpeg";
import cherry from "./images/cherry.jpeg";
import egg from "./images/egg.jpeg";
import avocado from "./images/avocado.jpeg";
import garlic from "./images/garlic.jpeg";
import lemon from "./images/lemon.jpeg";
import mixedFruit from "./images/mixedFruit.jpeg";
import mixedVeggie from "./images/mixedVeggie.jpeg";
import mixedveggies3 from "./images/mixedveggies3.jpeg";
import morlahana from "./images/morlahana.jpeg";
import nar from "./images/nar.jpeg";
import onion from "./images/onion.jpeg";
import onion2 from "./images/onion2.jpeg";
import onion3 from "./images/onion3.jpeg";
import onion4 from "./images/onion4.jpeg";
import pineapple from "./images/pineapple.jpeg";
import tomatobg from "./images/tomatobg.jpeg";
import visne from "./images/visne.jpeg";
import visne2 from "./images/visne2.jpeg";
import watermelon from "./images/watermelon.jpeg";
import wheat from "./images/wheat.jpeg";
import wmelon2 from "./images/wmelon2.jpeg";

import w1 from "./gradient/w1.jpeg";
import w2 from "./gradient/w2.jpeg";
import w3 from "./gradient/w3.jpeg";
import w4 from "./gradient/w4.jpeg";
import w5 from "./gradient/w5.jpeg";
import w6 from "./gradient/w6.jpeg";
import gradient3 from "./gradient/gradient3.jpeg";

import wheat2 from "./images/wheat2.jpeg";

export const newImageList = [
  { id: 1, image: pear },
  { id: 2, image: banana },
  { id: 3, image: berry },
  { id: 4, image: pepper },
  { id: 5, image: walnut },
  { id: 6, image: cherry },
  { id: 7, image: w6 },
  { id: 23, image: watermelon },
  { id: 8, image: avocado },
  { id: 9, image: garlic },
  { id: 17, image: onion2 },
  { id: 10, image: lemon },
  { id: 11, image: mixedFruit },
  { id: 12, image: mixedVeggie },
  { id: 13, image: mixedveggies3 },
  { id: 14, image: morlahana },
  { id: 15, image: nar },
  { id: 26, image: wheat2 },
  { id: 16, image: onion },

  { id: 18, image: onion3 },
  { id: 19, image: onion4 },
  { id: 20, image: pineapple },
  { id: 21, image: visne },
  { id: 22, image: visne2 },
  { id: 24, image: wheat },
  { id: 25, image: wmelon2 },
  { id: 19, image: onion4 },
  { id: 26, image: wheat2 },
  { id: 27, image: w1 },
];



export { logo, whiteLogo, textLogo2, tomatobg, gradient3, lemon, egg, wheat2, w1, w2, w3, w4, w5, w6,};

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

  darkBrown:"#4B2C20",

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

export const slideImageList = [
  { id: 1, name: "slide_blue", image: fetchedImages.slide_blue },
  { id: 2, name: "slide_cherry", image: fetchedImages.slide_cherry },
  { id: 3, name: "slide_chicken", image: fetchedImages.slide_chicken },
  { id: 4, name: "slide_grape", image: fetchedImages.slide_grape },
  { id: 5, name: "slide_lab", image: fetchedImages.slide_lab },
  { id: 6, name: "slide_lemon", image: fetchedImages.slide_lemon },
  { id: 7, name: "slide_meat", image: fetchedImages.slide_meat },
  // { id: 8, name: "slide_ve", image: fetchedImages.slide_ve },
];



//desc: admin answer list
export const adminAnswers = [
  { id: 1, answerType: "AI", text: "It's an answer by chat-gpt" },
  {
    id: 2,
    answerType: "RECEIVED_INQUIRY",
    text: "귀하의 문의가 정상적으로 접수되었습니다. 신속하게 답변드릴 수 있도록 최선을 다하겠습니다. 문의 사항에 대해 추가 정보가 필요할 경우, 고객님께 연락드리겠습니다. 감사합니다.",
  },
  {
    id: 3,
    answerType: "PROCESSING_IN_PROGRESS",
    text: "보내주신 요청에 대해 현재 담당 부서에서 검토 중입니다. 처리가 완료되는 대로 신속히 안내드리겠습니다. 더 궁금한 사항이 있으시면 언제든지 고객센터로 문의해 주세요. 감사합니다.",
  },
  {
    id: 4,
    answerType: "PROVIDE_SOLUTION",
    text: "불편을 드려 죄송합니다. 해당 문제는 [문제 원인]으로 발생한 것으로 보입니다. 아래의 방법을 시도해 주시길 권장 드립니다.",
  },
  {
    id: 5,
    answerType: "APOLOGIZE_FOR_SERVCIE_DELAY",
    text: "현재 예상치 못한 문제로 인해 서비스 제공에 다소 지연이 발생하고 있습니다. 고객님의 불편을 최소화하기 위해 최선을 다하고 있으며, 최대한 빠르게 정상화하도록 노력 중입니다. 이용에 불편을 드린 점 진심으로 사과드리며, 양해 부탁드립니다.",
  },
  {
    id: 6,
    answerType: "REQUEST_ADDITIONAL_INFO",
    text: "보내주신 문의에 대해 더 자세히 확인해드리기 위해 추가적인 정보가 필요합니다. 아래 정보를 회신해 주시면 보다 신속하게 도움 드릴 수 있도록 하겠습니다.",
  },
];
