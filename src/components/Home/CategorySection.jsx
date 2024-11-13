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
import { colors } from "../../assets/assest";

const CategorySection = ({ categories, loading, error }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`api/category/${category.name}`);
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
       minHeight: "100vh",
        backgroundColor: "#dedad7",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        margin: 2,
        borderRadius: "25px",
      }}
    >
      <Typography variant="h3" gutterBottom sx={{ color: "#7b481d" }}>
        대분류 선택
      </Typography>

      <Typography variant="h6" sx={{ mb: 3, color: colors.brown }}>
        카테고리를 선택해주세요. 더 세부적으로 탐색할 수 있는 다양한 하위
        카테고리들이 제공되는 페이지로 이동합니다.
        <br /> 원하는 하위 카테고리를 클릭하여 상품을 보다 정확하게 찾을 수
        있습니다.
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        marginTop={3}
      >
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
                backgroundColor: "#f5f5f5",
                "&:hover": {
                  boxShadow: 10,
                  transform: "scale(1.05)",
                  "& .overlay": {
                    transform: "translateY(0)",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
                  filter: "brightness(0.8)",
                  transition: "filter 0.5s ease",
                  "&:hover": {
                    filter: "brightness(1)",
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
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
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
