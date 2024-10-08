import React, { useContext, useState } from "react";
import EventSlide from "../../components/EventSlide/EventSlide";


import CategorySection from "../../components/CategorySection/CategorySection";
import Header from "../../layouts/Header/Header";



const Home = () => {

  return (
    <>


      <div className="container">
        <h1>Home</h1>
        <EventSlide />
        <CategorySection />
      </div>
    </>
  );
};

export default Home;
