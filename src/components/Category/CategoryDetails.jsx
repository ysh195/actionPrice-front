/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { largeCategoryList } from "../../assets/assest.js";

import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMiddleCategories,
  fetchSmallCategories,
  fetchRankCategories,
  fetchData,
  setMiddleCategory,
  setSmallCategory,
  setRankCategory,
} from "../../redux/slices/categorySlice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const CategoryDetail = () => {
  const { large } = useParams();
  const query = useQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Extract query parameters
  const startDate = query.get("startDate") || "";
  const endDate = query.get("endDate") || "";
  const pageNum = query.get("pageNum") || 1; // Default to page 1
  const [selectedLarge, setSelectedLarge] = useState(large || "");

  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedPageNum, setSelectedPageNum] = useState(pageNum);

  const {
    selectedMiddle,
    selectedSmall,
    selectedRank,
    middleCategoryList,
    smallCategoryList,
    rankCategoryList,
    dataList,
    loading,
    error,
  } = useSelector((state) => state.category);

  console.log("largeCategoryList:", largeCategoryList);

  useEffect(() => {
    // Reset other categories when large category changes
    if (selectedLarge) {
      console.log("selectedLarge", selectedLarge);
      dispatch(setMiddleCategory(""));
      dispatch(setSmallCategory(""));
      dispatch(setRankCategory(""));
      dispatch(fetchMiddleCategories(selectedLarge));
    }
  }, [dispatch, selectedLarge]);
  const handleCategoryChange = (type, value) => {
    switch (type) {
      case "large":
        setSelectedLarge(value);
        dispatch(setMiddleCategory(""));
        dispatch(setSmallCategory(""));
        dispatch(setRankCategory(""));
        dispatch(fetchMiddleCategories(value)); // Pass the value directly
        navigate(`/api/category/${value}`);
        // navigate(`/api/category?large=${value}`);

        break;

      case "middle":
        dispatch(setMiddleCategory(value));
        dispatch(setSmallCategory(""));
        dispatch(setRankCategory(""));
        dispatch(fetchSmallCategories({ large: selectedLarge, middle: value }));
        navigate(`/api/category/${selectedLarge}/${value}`);
        // navigate(`/api/category?large=${selectedLarge}&middle=${value}`);

        break;
      case "small":
        dispatch(setSmallCategory(value));
        dispatch(setRankCategory(""));
        dispatch(
          fetchRankCategories({
            large: selectedLarge,
            middle: selectedMiddle,
            small: value,
          })
        );
        navigate(`/api/category/${selectedLarge}/${selectedMiddle}/${value}`);
        // navigate(
        //   `/api/category?large=${selectedLarge}&middle=${selectedMiddle}&small=${value}`
        // );

        break;
      case "rank":
        dispatch(setRankCategory(value));
        navigate(
          `/api/category/${selectedLarge}/${selectedMiddle}/${selectedSmall}/${value}`
        );
        break;
      default:
        break;
    }
  };

  const handleSearch = () => {
    const url = `/api/category/${selectedLarge}/${selectedMiddle}/${selectedSmall}/${selectedRank}?startDate=${selectedStartDate}&endDate=${selectedEndDate}&pageNum=${selectedPageNum}`;
    navigate(url);

    dispatch(
      fetchData({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum,
      })
    );
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
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Large Category</InputLabel>
          <Select
            value={selectedLarge}
            onChange={(e) => handleCategoryChange("large", e.target.value)}
          >
            {largeCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedLarge}>
          <InputLabel>Middle Category</InputLabel>
          <Select
            value={selectedMiddle}
            disabled={!selectedLarge}
            onChange={(e) => handleCategoryChange("middle", e.target.value)}
          >
            {middleCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedMiddle}>
          <InputLabel>Small Category</InputLabel>
          <Select
            value={selectedSmall}
            disabled={!selectedMiddle}
            onChange={(e) => handleCategoryChange("small", e.target.value)}
          >
            {smallCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" disabled={!selectedSmall}>
          <InputLabel>Rank Category</InputLabel>
          <Select
            value={selectedRank}
            disabled={!selectedSmall}
            onChange={(e) => handleCategoryChange("rank", e.target.value)}
          >
            {rankCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <TextField
          type="date"
          label="Start Date"
          value={selectedStartDate}
          onChange={(e) => setSelectedStartDate(e.target.value)}
        />
        <TextField
          type="date"
          label="End Date"
          value={selectedEndDate}
          onChange={(e) => setSelectedEndDate(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          disabled={
            !selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank
          }
          onClick={handleSearch}
        >
          Search
        </Button>
        {/* <ul>
          {dataList.map((product) => (
            <li key={product.id}>{product.name}</li> // Adjust based on your product structure
          ))}
        </ul> */}
      </Box>
    </Container>
  );
};

export default CategoryDetail;
