import React from "react";
import EventSlide from "../components/EventSlide";
import CategorySection from "../components/CategorySection";
import B_EventSlide from "../Bootsrap/B_EventSlide";

import B_CategorySection from "../Bootsrap/B_CategorySection";

import M_CategorySection from "../Bootsrap/M_CategorySection";



const Home = () => {
  return (
    <>
      <div className="container">
        {/* <EventSlide /> */}
        <B_EventSlide />
        {/* <CategorySection /> */}
        {/* <B_CategorySection /> */}
        <M_CategorySection />
      </div>
    </>
  );
};

export default Home;
