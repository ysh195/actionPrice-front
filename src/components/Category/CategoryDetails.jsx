/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { colors, largeCategoryList } from "../../assets/assest.js";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMiddleCategories,
  fetchSmallCategories,
  fetchRankCategories,
  fetchProductList,
  clearProductList,
  downloadExcel,
} from "../../redux/slices/categorySlice";
import ProductListView from "./ProductListView.jsx";
import { createFavorite } from "../../redux/slices/favoriteSlice.jsx";

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
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [favorite_name, setFavorite_name] = useState("");
  const logined_username = useSelector((state) => state.login.username);

  const {
    middleCategoryList,
    smallCategoryList,
    rankList,
    productList,
    loading,
    error,
    totalPageNum,
  } = useSelector((state) => state.category);


  console.log("large:", large, "middle:", middle,  "small:",small, "rank:",rank)

  // useEffect(() => {
  //   if (large || middle || small || rank) {
  //     setSelectedLarge(large);
  //     setSelectedMiddle(middle);
  //     setSelectedSmall(small);
  //     setSelectedRank(rank);
  //     console.log("fetching middle");
  //     dispatch(fetchMiddleCategories(large)),
  //       dispatch(fetchSmallCategories(middle)),
  //       dispatch(fetchRankCategories(small)),
  //       console.log("fetched middle");
  //   }
  // }, [large, middle, small, rank, dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (large) {
        setSelectedLarge(large);
        console.log("fetching middle categories");
        await dispatch(fetchMiddleCategories(large)); // Waits for middle categories
      }

      if (middle) {
        setSelectedMiddle(middle);
        console.log("fetching small categories");
        await dispatch(fetchSmallCategories(large, middle)); // Waits for small categories
      }

      if (small) {
        setSelectedSmall(small);
        console.log("fetching rank categories");
        await dispatch(fetchRankCategories(large, middle, small)); // Waits for rank categories
      }

      if (rank) {
        setSelectedRank(rank);
      }
      console.log("Fetched all categories");
    };

    fetchCategories();
  }, [large, middle, small, rank, dispatch]);


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
    setSearchParams({
      startDate: selectedStartDate,
      endDate: selectedEndDate,
      pageNum: 1, // Reset to page 1 on new search
    });
    dispatch(
      fetchProductList({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum: pageNum, // Adjust for zero-based index
      })
    );
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

  const handleDownloadExcel = () => {
    if (!selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank) {
      return;
    }
    const large = selectedLarge;
    const middle = selectedMiddle;
    const small = selectedSmall;
    const rank = selectedRank;
    const startDate = selectedStartDate;
    const endDate = selectedEndDate;
    const pageNum = searchParams.get("pageNum") || 1;

    dispatch(
      downloadExcel({ large, middle, small, rank, startDate, endDate, pageNum })
    );
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
        pageNum: value, // Pass the new page number
      })
    );
  };

  const handleFavoriteNameChange = (event) => {
    setFavorite_name(event.target.value);
  };

  const handleAddFavorite = () => {
    if (favorite_name.trim() === "") {
      alert("Please enter a name for your favorite item.");
      return;
    }

    dispatch(
      createFavorite({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        logined_username,
        favorite_name,
      })
    );
    setFavorite_name("");
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
            {rankList.map((rank) => (
              <MenuItem key={rank.id} value={rank.name}>
                {rank.name}
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
          <Button
            sx={{ width: "100px" }}
            variant="outlined"
            onClick={handleDownloadExcel}
            disabled={
              !selectedLarge ||
              !selectedMiddle ||
              !selectedSmall ||
              !selectedRank ||
              loading
            }
          >
            {loading ? "Downloading..." : "Download"}
          </Button>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <TextField
          label="Favorite Name"
          value={favorite_name}
          onChange={handleFavoriteNameChange}
          size="small"
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={handleAddFavorite}>
          Add to Favorites
        </Button>
      </Box>
      <ProductListView productList={productList} pageNum={pageNum} />
      <Pagination
        //todo backend total page num must be change
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
