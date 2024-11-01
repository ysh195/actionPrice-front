import logo from "./images/logo.png";
import veggies from "./images/veggies.jpg";
import veggie2 from "./images/veggie2.jpg";
import egg1 from "./images/egg1.jpg";
import dairy from "./images/dairy.jpg";
import pork from "./images/pork.jpg";

export const icons = {
  logo,
};

export const slide_images = {
  veggies,
  veggie2,
  egg1,
  dairy,
  pork,
};

export const category_list = [
  {
    title: "채소류",
    path: "/채소류",
    image: veggies,
  },
  {
    title: "축산물",
    path: "/축산물",
    image: pork,
  },

  {
    title: "과일류",
    path: "/과일류",
    image: egg1,
  },
  {
    title: "식량작물",
    path: "/식량작물",
    image: veggie2,
  },

  {
    title: "특용작물",
    path: "/특용작물",
    image: dairy,
  },

  {
    title: "수산물",
    path: "/수산물",
    image: veggie2,
  },
  {
    title: "특용작물",
    path: "/특용작물",
    image: veggie2,
  },
];
