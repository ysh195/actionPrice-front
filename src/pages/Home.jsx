import React, { useContext, useState } from "react";
import EventSlide from "../components/EventSlide";

import CategorySection from "../components/CategorySection";


const Home = () => {
  return (
    <>
      <div className="container">

        <EventSlide />
        <CategorySection />
      </div>
    </>
  );
};

export default Home;
