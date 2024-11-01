/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import axios from "axios";

const CategoryDetail = () => {
  const { categoryTitle } = useParams(); // Get the category title from the URL
  const [middleCategoryList, setMiddleCategoryList] = useState([]);
  const [smallCategoryList, setSmallCategoryList] = useState([]);
  const [levelList, setLevelList] = useState([]);
  const [middleCategory, setMiddleCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submittedData, setSubmittedData] = useState(null); // State to store submitted data

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const middleResponse = await axios.get(
          `/api/categories/large/middle/${categoryTitle}`
        );
        setMiddleCategoryList(middleResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching middle categories:", err);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryTitle]);

  const handleMiddleCategoryChange = async (event) => {
    const selectedMiddle = event.target.value;
    setMiddleCategory(selectedMiddle);
    setSmallCategory(""); // Reset small category
    setLevelList([]); // Reset levels

    try {
      const response = await axios.get(
        `/api/categories/small/${categoryTitle}/${selectedMiddle}`
      );
      setSmallCategoryList(response.data);
    } catch (err) {
      console.error("Error fetching small categories:", err);
      setError("Failed to load small categories. Please try again later.");
    }
  };

  const handleSmallCategoryChange = async (event) => {
    const selectedSmall = event.target.value;
    setSmallCategory(selectedSmall);

    try {
      const response = await axios.get(
        `/api/categories/levels/${categoryTitle}/${selectedSmall}`
      );
      setLevelList(response.data);
    } catch (err) {
      console.error("Error fetching levels:", err);
      setError("Failed to load levels. Please try again later.");
    }
  };

  const handleLevelChange = (event) => {
    setLevel(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      middleCategory,
      smallCategory,
      level,
    };
    setSubmittedData(data); // Set submitted data
  };

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        {categoryTitle} Details
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Middle Category</InputLabel>
          <Select value={middleCategory} onChange={handleMiddleCategoryChange}>
            {/* {middleCategoryList.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))} */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!middleCategory}>
          <InputLabel>Small Category</InputLabel>
          <Select value={smallCategory} onChange={handleSmallCategoryChange}>
            {/* {smallCategoryList.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))} */}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!smallCategory}>
          <InputLabel>Level</InputLabel>
          <Select value={level} onChange={handleLevelChange}>
            {/* {levelList.map((levelItem) => (
            <MenuItem key={levelItem.id} value={levelItem.name}>
              {levelItem.name}
            </MenuItem>
          ))} */}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!middleCategory || !smallCategory || !level}
      >
        Submit
      </Button>

      {/* Render table if data has been submitted */}
      {submittedData && (
        <TableContainer component={Paper} sx={{ marginTop: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Middle Category</TableCell>
                <TableCell>Small Category</TableCell>
                <TableCell>Level</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{submittedData.middleCategory}</TableCell>
                <TableCell>{submittedData.smallCategory}</TableCell>
                <TableCell>{submittedData.level}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default CategoryDetail;
