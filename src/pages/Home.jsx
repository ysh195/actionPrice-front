/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import EventSlide from "../components/Home/EventSlide.jsx";
import CategorySection from "../components/Home/CategorySection.jsx";
import { slideImageList, largeCategoryList } from "../assets/assest.js";
import ImageSection from "../components/Home/ImageSection.jsx";


const Home = () => {
  const [categories, setCategories] = useState(largeCategoryList);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slideImages, setSlideImages] = useState([]);

  // Fetch images from the database
  const fetchImages = async () => {
    try {
      setSlideImages(slideImageList);
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
    <>
      <EventSlide slideImages={slideImages} error={error} loading={loading} />
      <ImageSection />
      <CategorySection
        categories={categories}
        error={error}
        loading={loading}
      />
    </>
  );
};

export default Home;
