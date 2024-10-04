import React, { useState } from "react";
import EventSlide from "../../components/EventSlide/EventSlide";
import Category from "../../components/Category";
import CategorySection from "../../components/CategorySection/CategorySection";
import Header from "../../layouts/Header/Header";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <EventSlide />
      <CategorySection setCategory={setCategory} category={category} />
    </div>
  );
};

export default Home;
