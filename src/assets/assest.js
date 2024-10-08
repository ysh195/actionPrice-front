import facebook_icon from "./images/facebook_icon.png";
import twitter_icon from "./images/twitter_icon.png";
import linkedin_icon from "./images/linkedin_icon.png";
import logo from "./images/logo.png";
import profile_icon from "./images/profile_icon.png";
import plants from "./images/plants.png";
import sympathy from "./images/sympathy.png";
import gifts from "./images/gifts.png";
import flowers from "./images/flowers.png";
import veggies from "./images/veggies.jpg";
import veggie2 from "./images/veggie2.jpg";
import meat from "./images/meat.jpg";
import fish from "./images/fish.jpg";
import egg from "./images/egg.jpg";
import egg1 from "./images/egg1.jpg";
import dairy from "./images/dairy.jpg";
import pork from "./images/pork.jpg";

export const icons = {
  linkedin_icon,
  facebook_icon,
  twitter_icon,

  profile_icon,
  logo,
  plants,
  sympathy,
  gifts,
  flowers,
};

export const slide_images = {
  veggies,
  veggie2,
  meat,
  fish,
  egg,
  egg1,
  dairy,
  pork,
};

export const category_list = [
  {
    title: "Meat",
    path: "/category1",
    image: meat,
  },
  {
    title: "Veggie",
    path: "/category2",
    image: veggies,
  },
  {
    title: "Fish",
    path: "/category3",
    image: fish,
  },

  {
    title: "Dairy",
    path: "/category4",
    image: dairy,
  },
  {
    title: "Pork",
    path: "/category5",
    image: pork,
  },
  {
    title: "Veggie2",
    path: "/category6",
    image: veggie2,
  },
];

export const dropMenu = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Categories",
    path: "/categories",
    subMenu: [
      {
        title: "Meat",
        path: "/meat",
        subMenu: [
          { title: "소고기", path: "/meat-sub1" },
          { title: "돼지고기", path: "/meat-sub2" },
          { title: "닭", path: "/meat-sub2" },
        ],
      },
      { title: "야채", path: "/veggie" },
      { title: "Dairy", path: "/dairy" },
      { title: "Fish", path: "/fish" },
    ],
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
  {
    title: "Login",
    path: "api/user/login",
    subMenu: [
      { title: "MyPage", path: "/mypage" },
      { title: "Logout" },
    ],
  },

];
export const mockCateg = [
  {
    id:1,
    title: "Meat",
  },
   {
    id:2,
    title: "Veggie",
  },
   {
    id:3,
    title: "Fish",
  }

];
