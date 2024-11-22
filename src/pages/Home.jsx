/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import CategorySection from "../components/Home/CategorySection.jsx";
import { largeCategoryList } from "../assets/assest.js";
import ImageSection from "../components/Home/ImageSection.jsx";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch images from the database
  const fetchImages = async () => {
    try {
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
    <>
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
