/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
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
  Box,
} from "@mui/material";

const CategorySection = ({ categories, loading, error }) => {
  const navigate = useNavigate();

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
    <Box id="categories" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        대분료 선택
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
            <Card
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                height: "100%",
                "&:hover .overlay": {
                  transform: "translateY(0)",
                },
              }}
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
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  transform: "translateY(100%)",
                  transition: "transform 0.6s ease",
                }}
              >
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Explore the {category.name} category
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategorySection;
