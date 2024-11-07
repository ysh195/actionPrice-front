/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { colors, largeCategoryList } from "../../assets/assest.js";
import GetAppIcon from "@mui/icons-material/GetApp"; // Importing download icon

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
  Pagination,
  IconButton,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMiddleCategories,
  fetchSmallCategories,
  fetchRankCategories,
  fetchProductList,
  clearProductList,
} from "../../redux/slices/categorySlice";
import ProductListView from "./ProductListView.jsx";

import Favorite_DownloadButton from "./Favorite_DownloadButton.jsx";
import DateChange from "./DateChange.jsx";
import CategorySelect from "./CategorySelect.jsx";

const CategoryDetail = () => {
  const { large, middle, small, rank } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  // Extracting query parameters using searchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const pageNum = parseInt(searchParams.get("pageNum")) || 1;

  const [selectedLarge, setSelectedLarge] = useState(large || "");
  const [selectedMiddle, setSelectedMiddle] = useState(middle || "");
  const [selectedSmall, setSelectedSmall] = useState(small || "");
  const [selectedRank, setSelectedRank] = useState(rank || "");
  const [selectedStartDate, setSelectedStartDate] = useState(startDate || "");
  const [selectedEndDate, setSelectedEndDate] = useState(endDate || "");
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  // const logined_username = useSelector((state) => state.login.username);
    const logined_username = localStorage.getItem("username");


  const {
    middleCategoryList,
    smallCategoryList,
    rankList,
    productList,
    loading,
    error,
    totalPageNum,
  } = useSelector((state) => state.category);

  console.log(
    "large:",
    large,
    "middle:",
    middle,
    "small:",
    small,
    "rank:",
    rank
  );

  useEffect(() => {
    // Fetching the middle categories based on the large category
    if (large) {
      setSelectedLarge(large);
      dispatch(fetchMiddleCategories(large));
    }
  }, [large, dispatch]);

  useEffect(() => {
    // Fetching the small categories based on the middle category
    if (selectedMiddle) {
      setSelectedMiddle(middle);
      dispatch(
        fetchSmallCategories({ large: selectedLarge, middle: selectedMiddle })
      );
    }
  }, [selectedLarge, selectedMiddle, middle, dispatch]);

  useEffect(() => {
    // Fetching the rank categories based on the small category
    if (selectedSmall) {
      setSelectedSmall(small);
      dispatch(
        fetchRankCategories({
          large: selectedLarge,
          middle: selectedMiddle,
          small: selectedSmall,
        })
      );
    }
  }, [selectedLarge, selectedMiddle, small, selectedSmall, dispatch]);

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
    // Check all conditions before running search

    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank) {
      return;
    }
    setSearchParams({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      pageNum: 1, // Reset to page 1 on new search
    });
    dispatch(
      //todo: cancel fetch after date selection
      fetchProductList({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum: pageNum - 1, // Adjust for zero-based index
      })
    );
    setShowDownloadButton(true);
  };

  const handleReset = () => {
    setSelectedLarge("");
    setSelectedMiddle("");
    setSelectedSmall("");
    setSelectedRank("");
    setSelectedStartDate("");
    setSelectedEndDate("");
    setSearchParams({});
    dispatch(clearProductList());
    navigate(`/api/category/:large`);
  };

  const handlePageChange = (event, value) => {
    if (value < 1) return; // Prevent navigating to less than page 1
    setSearchParams({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      pageNum: value,
    });
    dispatch(
      fetchProductList({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum: value - 1, // Pass the new page number
      })
    );
  };

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
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        {/* Category Selects */}
        <CategorySelect
          label="대분류를 선택하세요"
          value={selectedLarge}
          handleCategoryChange={handleCategoryChange}
          categoryList={largeCategoryList}
          categoryType="large"
        />
        {/* <FormControl sx={{ width: "200px" }} margin="normal">
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
        </FormControl> */}
        <CategorySelect
          label="중분류를 선택하세요"
          value={selectedMiddle}
          handleCategoryChange={handleCategoryChange}
          categoryList={middleCategoryList}
          categoryType="middle"
        />
        {/* <FormControl
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
        </FormControl> */}
        <CategorySelect
          label="소분류를 선택하세요"
          value={selectedSmall}
          handleCategoryChange={handleCategoryChange}
          categoryList={smallCategoryList}
          categoryType="small"
        />

        {/* <FormControl
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
        </FormControl> */}
        <CategorySelect
          label="등급을 선택하세요"
          value={selectedRank}
          handleCategoryChange={handleCategoryChange}
          categoryList={rankList}
          categoryType="rank"
        />

        {/* <FormControl
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
            {rankList.map((rank) => (
              <MenuItem key={rank.id} value={rank.name}>
                {rank.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

        <DateChange
          selectedStartDate={selectedStartDate}
          setSelectedStartDate={setSelectedStartDate}
          selectedEndDate={selectedEndDate}
          setSelectedEndDate={setSelectedEndDate}
        />
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
            sx={{ width: "100px" }}
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
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: "100px" }}
            onClick={handleReset}
          >
            초기화
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Favorite_DownloadButton
          selectedLarge={selectedLarge}
          selectedMiddle={selectedMiddle}
          selectedSmall={selectedSmall}
          selectedRank={selectedRank}
          logined_username={logined_username}
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          showDownloadButton={showDownloadButton}
        />
      </Box>
      <ProductListView productList={productList} pageNum={pageNum} />
      <Pagination
        count={totalPageNum} // Total number of pages from Redux state
        page={pageNum} // Current page
        onChange={handlePageChange}
        variant="outlined"
        sx={{ margin: "auto" }}
      />
    </Box>
  );
};
export default CategoryDetail;
