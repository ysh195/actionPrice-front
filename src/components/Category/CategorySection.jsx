/* eslint-disable no-unused-vars */
import { largeCategoryList } from "../../assets/assest.js";
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

const CategorySection = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setCategories(largeCategoryList);
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
    navigate(`api/category/${category.name}/:middle/:small/:rank`);
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
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              onClick={() => handleCategoryClick(category)}
              sx={{ cursor: "pointer", height: "100%" }}
              aria-label={`Go to ${category.name} category`}
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${category.image}`}
                alt={category.name}
                sx={{
                  height: 200,
                  width: "100%",
                  objectFit: "cover",
                }}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {category.name}
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
