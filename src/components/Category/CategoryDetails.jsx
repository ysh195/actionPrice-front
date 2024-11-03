/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMiddleCategories,
  fetchSmallCategories,
  fetchRankCategories,
  fetchProductList,
  setMiddleCategory,
  setSmallCategory,
  setRankCategory,
} from "../../redux/slices/categorySlice";
import ProductListView from "./ProductListView.jsx";

const CategoryDetail = () => {
  const { large } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Extracting query parameters using searchParams
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const pageNum = searchParams.get("pageNum") || 1; // Default to page 1

  const [selectedLarge, setSelectedLarge] = useState(large || "");
  const [selectedMiddle, setSelectedMiddle] = useState("");
  const [selectedSmall, setSelectedSmall] = useState("");
  const [selectedRank, setSelectedRank] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [selectedPageNum, setSelectedPageNum] = useState(pageNum);

  const {
    middleCategoryList,
    smallCategoryList,
    rankCategoryList,
    productList,
    loading,
    error,
  } = useSelector((state) => state.category);

  console.log("largeCategoryList:", largeCategoryList);

  useEffect(() => {
    // Reset other categories when large category changes
    if (selectedLarge) {
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
        setSelectedMiddle("");
        setSelectedSmall("");
        setSelectedRank("");
        dispatch(fetchMiddleCategories(value));
        navigate(`/api/category/${value}`);
        break;

      case "middle":
        setSelectedMiddle(value);
        setSelectedSmall("");
        setSelectedRank("");
        dispatch(fetchSmallCategories({ large: selectedLarge, middle: value }));
        navigate(`/api/category/${selectedLarge}/${value}`);
        break;

      case "small":
        setSelectedSmall(value);
        setSelectedRank("");
        dispatch(
          fetchRankCategories({
            large: selectedLarge,
            middle: selectedMiddle,
            small: value,
          })
        );
        navigate(`/api/category/${selectedLarge}/${selectedMiddle}/${value}`);
        break;

      case "rank":
        setSelectedRank(value);
        navigate(
          `/api/category/${selectedLarge}/${selectedMiddle}/${selectedSmall}/${value}`
        );
        break;

      default:
        break;
    }
  };

  const handleSearch = () => {
    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank) {
      return;
    }
    // Updating search parameters using setSearchParams
    setSearchParams({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      pageNum: selectedPageNum,
    });

    dispatch(
      fetchProductList({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum: selectedPageNum,
      })
    );
  };

  const handleReset = () => {
    // Reset local state
    setSelectedLarge("");
    setSelectedMiddle("");
    setSelectedSmall("");
    setSelectedRank("");
    setSelectedStartDate("");
    setSelectedEndDate("");
    setSelectedPageNum(1);
    setSearchParams({});
    // navigate("/api/category/:large?");
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
    <Box
      sx={{
        m: 5,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        {/* Category Selects */}
        <FormControl sx={{ width: "200px" }} margin="normal">
          <InputLabel
            style={{
              transform: selectedLarge
                ? "translate(0, -1.5em) scale(0.75)"
                : undefined,
            }}
          >
            대분류를 선택하세요
          </InputLabel>
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

        <FormControl
          sx={{ width: "200px" }}
          margin="normal"
          disabled={!selectedLarge}
        >
          <InputLabel
            style={{
              transform: selectedMiddle
                ? "translate(0, -1.5em) scale(0.75)"
                : undefined,
            }}
          >
            중분류를 선택하세요
          </InputLabel>
          <Select
            value={selectedMiddle}
            onChange={(e) => handleCategoryChange("middle", e.target.value)}
          >
            {middleCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{ width: "200px" }}
          margin="normal"
          disabled={!selectedMiddle}
        >
          <InputLabel
            style={{
              transform: selectedSmall
                ? "translate(0, -1.5em) scale(0.75)"
                : undefined,
            }}
          >
            소분류를 선택하세요
          </InputLabel>
          <Select
            value={selectedSmall}
            onChange={(e) => handleCategoryChange("small", e.target.value)}
          >
            {smallCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl
          sx={{ width: "200px" }}
          margin="normal"
          disabled={!selectedSmall}
        >
          <InputLabel
            style={{
              transform: selectedRank
                ? "translate(0, -1.5em) scale(0.75)"
                : undefined,
            }}
          >
            등급을 선택하세요
          </InputLabel>
          <Select
            value={selectedRank}
            onChange={(e) => handleCategoryChange("rank", e.target.value)}
          >
            {rankCategoryList.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Selects */}
        <FormControl sx={{ width: "200px" }} margin="normal">
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              top: -20,
              fontSize: "0.75rem",
              color: "text.secondary",
              transition: "all 0.2s ease",
            }}
          >
            시작일
          </Typography>
          <TextField
            type="date"
            value={selectedStartDate}
            onChange={(e) => setSelectedStartDate(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{ width: "200px" }} margin="normal">
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              top: -20,
              fontSize: "0.75rem",
              color: "text.secondary",
              transition: "all 0.2s ease",
            }}
          >
            종료일
          </Typography>
          <TextField
            type="date"
            value={selectedEndDate}
            onChange={(e) => setSelectedEndDate(e.target.value)}
          />
        </FormControl>
        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            m: 1,

            height: "56px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={
              !selectedLarge ||
              !selectedMiddle ||
              !selectedSmall ||
              !selectedRank
            }
            onClick={handleSearch}
          >
            조회
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleReset}>
            초기화
          </Button>
        </Box>
      </Box>

      <ProductListView productList={productList} />
    </Box>
  );
};
export default CategoryDetail;
