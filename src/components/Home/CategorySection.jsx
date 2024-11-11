/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from "@mui/material";
import { colors } from "../../assets/assest";

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
    <Box
      id="categories"
      sx={{
        width: "80%",
        margin: "6rem auto",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        대분류 선택
      </Typography>

      <Typography variant="body1" align="center" sx={{ mb: 3 }}>
        카테고리를 선택해주세요. 더 세부적으로 탐색할 수 있는 다양한 하위
        카테고리들이 제공되는 페이지로 이동합니다.
        <br /> 원하는 하위 카테고리를 클릭하여 상품을 보다 정확하게 찾을 수
        있습니다.
      </Typography>

      <Grid container spacing={4} marginTop={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id} marginBottom={2}>
            <Card
              onClick={() => handleCategoryClick(category)}
              sx={{
                cursor: "pointer",
            
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5", // light background
        
                "&:hover": {
                  boxShadow: 10, // Add hover shadow
                  transform: "scale(1.05)", // Slightly scale on hover
                  "& .overlay": {
                    transform: "translateY(0)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Lighter overlay on hover
                  },
                },
              }}
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${category.image}`}
                alt={category.name}
                sx={{
                  height: 300,
                  width: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.8)", // Slightly dim the image
                  transition: "filter 0.5s ease", // Transition effect for hover
                  "&:hover": {
                    filter: "brightness(1)", // Brighten image on hover
                  },
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  transform: "translateY(100%)",
                  transition: "transform 0.6s ease",
                  padding: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" marginTop={2}>
                  하위 카테고리에서 더욱 세부적인 상품을 찾아보세요
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
