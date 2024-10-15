/* eslint-disable react/prop-types */
import React from "react";
import { category_list } from "../assets/assest";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Link,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategorySection = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleCategoryClick = (category) => {
    // Navigate to the detailed page for the clicked category
    navigate(`/category-details/${category.title}`);
  };

  return (
    <Container id="categories" sx={{ padding: 10 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Explore All Categories
      </Typography>
      <Box>
        <Grid container spacing={3}>
          {category_list.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 2,
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: 5,
                  },
                }}
                onClick={() => handleCategoryClick(item)} // Navigate on card click
              >
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="140"
                  image={item.image}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: "#16423C" }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategorySection;
