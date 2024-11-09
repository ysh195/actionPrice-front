/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import EventSlide from "../components/Home/EventSlide.jsx";
import CategorySection from "../components/Home/CategorySection.jsx";
import { slideImageList, largeCategoryList } from "../assets/assest.js";
import Test from "../test/Test.jsx";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideImages, setSlideImages] = useState([]);

  const fetchImages = async () => {
    try {
      setSlideImages(slideImageList);
      setCategories(largeCategoryList);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("fetchImages in homepage ");
    fetchImages();
  }, []);

  return (

      <div>
        <EventSlide slideImages={slideImages} error={error} loading={loading} />
        <CategorySection
          categories={categories}
          error={error}
          loading={loading}
        />
      </div>
    
  );
};

export default Home;
