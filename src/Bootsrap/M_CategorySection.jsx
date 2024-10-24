import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const fetchedImages = response.data.images;

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
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category-details/${category.title}`);
  };

  return (
    <Container id="categories" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Explore All Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => handleCategoryClick(item)}
              sx={{ cursor: "pointer", height: "100%" }}
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${item.image}`}
                alt={item.title}
                sx={{ height: 200, objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategorySection;
