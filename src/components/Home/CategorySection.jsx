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
    <Box id="categories" sx={{ py: 10, width: "80%", margin: "30px auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        대분료 선택
      </Typography>
      <Typography variant="body1" align="center" sx={{ marginBottom: 3 }}>
        선택한 카테고리에 해당하는 하위 카테고리를 선택해주세요. 이 페이지에서는
        상품을 더 세부적으로 탐색할 수 있는 다양한 하위 카테고리들을 제공합니다.
        원하는 하위 카테고리를 클릭하여 상품을 보다 정확하게 찾을 수 있습니다.
      </Typography>

      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category.id}>
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
                "&:hover .overlay": {
                  transform: "translateY(0)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={`data:image/jpeg;base64,${category.image}`}
                alt={category.name}
                sx={{
                  height: 250,
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
