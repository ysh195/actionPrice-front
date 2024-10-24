import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/CategoryDetails.css";

const bigCategory = [
  { id: "1", name: "Meat" },
  { id: "2", name: "Veggie" },
  { id: "3", name: "Fish" },
  { id: "4", name: "Dairy" },
];

const midlleCategory = [
  { id: "1", categoryId: "1", name: "Haryana" },
  { id: "2", categoryId: "1", name: "Delhi" },
  { id: "3", categoryId: "2", name: "Texas" },
  { id: "4", categoryId: "2", name: "California" },
];

const smallCategory = [
  { id: "1", smallCategoryId: "1", name: "Faridabad" },
  { id: "2", smallCategoryId: "1", name: "Palwal" },
  { id: "3", smallCategoryId: "2", name: "Mandi House" },
  { id: "4", smallCategoryId: "2", name: "Kalka Ji" },
  { id: "5", smallCategoryId: "3", name: "Houston" },
  { id: "6", smallCategoryId: "3", name: "Austin" },
  { id: "7", smallCategoryId: "4", name: "Los Angeles" },
  { id: "8", smallCategoryId: "4", name: "San Diego" },
];

const categoryData = {
  Meat: {
    title: "Meat",
    description: "Find the best prices for various types of meat.",
    image: "path_to_meat_image.jpg", // Replace with actual image path
  },
  Veggie: {
    title: "Veggie",
    description: "Fresh and healthy vegetables at competitive prices.",
    image: "path_to_veggies_image.jpg", // Replace with actual image path
  },
  Fish: {
    title: "Fish",
    description: "The freshest seafood available in your area.",
    image: "path_to_seafood_image.jpg", // Replace with actual image path
  },
  Dairy: {
    title: "Dairy",
    description: "Quality dairy products sourced locally.",
    image: "path_to_dairy_image.jpg", // Replace with actual image path
  },
};

const CategoryDetails = () => {
  const { categoryTitle } = useParams();
  const category = categoryData[categoryTitle];

  const [category1, setCategory1] = useState([]);
  const [category2, setCategory2] = useState([]);
  const [category3, setCategory3] = useState([]);
  const [selectedCategory1, setSelectedCategory1] = useState("");
  const [selectedCategory2, setSelectedCategory2] = useState("");
  const [selectedCategory3, setSelectedCategory3] = useState("");

  useEffect(() => {
    setCategory1(bigCategory);
  }, []);

  const handleCategory1Change = (id) => {
    setSelectedCategory1(id);
    const data = midlleCategory.filter((middle) => middle.categoryId === id);
    setCategory2(data);
    setSelectedCategory2(""); // Reset Category 2 and 3
    setCategory3([]);
    setSelectedCategory3(""); // Reset Category 3
  };

  const handleCategory2Change = (id) => {
    setSelectedCategory2(id);
    const data = smallCategory.filter((small) => small.smallCategoryId === id);
    setCategory3(data);
    setSelectedCategory3(""); // Reset Category 3
  };

  const handleCategory3Change = (id) => {
    setSelectedCategory3(id); // Update selected value for Category 3
  };

  if (!category) {
    return <h6>Category not found.</h6>;
  }

  return (
    <div className="category-details-container">
      <h4>{category.title}</h4>
      <div className="category-card">
        <img
          src={category.image}
          alt={category.title}
          className="category-image"
        />
        <div className="category-card-body">
          <p>{category.description}</p>
        </div>
      </div>

      <div className="category-selection">
        <div className="category-select">
          <label>Select Category 1</label>
          <select
            value={selectedCategory1}
            onChange={(e) => handleCategory1Change(e.target.value)}
          >
            <option value="">None</option>
            {category1.map((big) => (
              <option key={big.id} value={big.id}>
                {big.name}
              </option>
            ))}
          </select>
        </div>

        <div className="category-select">
          <label>Select Category 2</label>
          <select
            value={selectedCategory2}
            onChange={(e) => handleCategory2Change(e.target.value)}
            disabled={!selectedCategory1}
          >
            <option value="">None</option>
            {category2.map((middle) => (
              <option key={middle.id} value={middle.id}>
                {middle.name}
              </option>
            ))}
          </select>
        </div>

        <div className="category-select">
          <label>Select Category 3</label>
          <select
            value={selectedCategory3}
            onChange={(e) => handleCategory3Change(e.target.value)}
            disabled={!selectedCategory2}
          >
            <option value="">None</option>
            {category3.map((small) => (
              <option key={small.id} value={small.id}>
                {small.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
