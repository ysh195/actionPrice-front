/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

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
    setSelectedCategory2("");
    setCategory3([]);
    setSelectedCategory3("");
  };

  const handleCategory2Change = (id) => {
    setSelectedCategory2(id);
    const data = smallCategory.filter((small) => small.smallCategoryId === id);
    setCategory3(data);
    setSelectedCategory3("");
  };

  const handleCategory3Change = (id) => {
    setSelectedCategory3(id);
  };

  if (!category) {
    return <h6>Category not found.</h6>;
  }

  return (
    <Container className="py-4">
      <Typography variant="h4">{category.title}</Typography>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={category.image}
          alt={category.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="body1">{category.description}</Typography>
        </CardContent>
      </Card>

      <Grid container spacing={4} className="mt-4">
        <Grid item md={4}>
          <FormControl fullWidth>
            <InputLabel>Select Category 1</InputLabel>
            <Select
              value={selectedCategory1}
              onChange={(e) => handleCategory1Change(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {category1.map((big) => (
                <MenuItem key={big.id} value={big.id}>
                  {big.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <FormControl fullWidth disabled={!selectedCategory1}>
            <InputLabel>Select Category 2</InputLabel>
            <Select
              value={selectedCategory2}
              onChange={(e) => handleCategory2Change(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {category2.map((middle) => (
                <MenuItem key={middle.id} value={middle.id}>
                  {middle.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          <FormControl fullWidth disabled={!selectedCategory2}>
            <InputLabel>Select Category 3</InputLabel>
            <Select
              value={selectedCategory3}
              onChange={(e) => handleCategory3Change(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {category3.map((small) => (
                <MenuItem key={small.id} value={small.id}>
                  {small.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryDetails;
