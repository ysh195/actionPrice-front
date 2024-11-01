/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

const CategorySection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/");
      const fetchedImages = response.data.images;

      const categoryList = [
        { title: "채소류", image: fetchedImages.meat },
        { title: "축산물", image: fetchedImages.egg },
        { title: "과일류", image: fetchedImages.cookie },
        { title: "식량작물", image: fetchedImages.veggie },
        { title: "수산물", image: fetchedImages.veggie },
        { title: "특용작물", image: fetchedImages.salted },
      ];

      setCategories(categoryList);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/category-details/${category.title}`);
  };

  if (loading) {
    return (
      <Container id="categories" sx={{ py: 5, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container id="categories" sx={{ py: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }
  return (
    <Container id="categories" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        메인 카테고리 선택
      </Typography>
      <Grid container spacing={2}>
        {categories.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              onClick={() => handleCategoryClick(item)}
              sx={{ cursor: "pointer", height: "100%" }}
              aria-label={`Go to ${item.title} category`}
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${item.image}`}
                alt={item.title}
                sx={{
                  height: 200, // Set a fixed height
                  width: "100%", // Full width
                  objectFit: "cover", // Keep the aspect ratio
                }}
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
