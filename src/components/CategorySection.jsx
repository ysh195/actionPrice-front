import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CategorySection.css"; // Import the CSS file
import axios from "axios";

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); 

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const fetchedImages = response.data.images;

      console.log(fetchedImages);

      const category_list = [
        { title: "Cookie", image: fetchedImages.cookie },
        { title: "Egg", image: fetchedImages.egg },
        { title: "Meat", image: fetchedImages.meat },
        { title: "Veggie", image: fetchedImages.veggie },
        { title: "Salted", image: fetchedImages.salted },
      ];

      setCategories(category_list);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch categories. Please try again later."); 
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCategoryClick = useCallback(
    (category) => {
      navigate(`/category-details/${category.title}`);
    },
    [navigate]
  );

  return (
    <div id="categories" className="category-container">
      <h4 className="category-title">Explore All Categories</h4>
      {error && <p className="error-message">{error}</p>}

      <div className="category-row">
        {categories.map((item, index) => (
          <div key={index} className="category-col">
            <div
              className="category-card"
              onClick={() => handleCategoryClick(item)}
            >
              <img
                src={`data:image/jpeg;base64,${item.image}`}
                alt={item.title}
                className="category-image"
              />
              <h5 className="category-card-title">{item.title}</h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(CategorySection);
