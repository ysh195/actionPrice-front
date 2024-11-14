/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import {
  Container,
  CircularProgress,
  Alert,
  Box,
  Pagination,
  Backdrop,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../redux/slices/categorySlice.jsx";
import ProductListView from "../components/Category/ProductListView.jsx";
import PriceGraphView from "../components/Category/PriceGraphView.jsx";
import CategoryDetail from "../components/Category/CategoryDetails.jsx";
import Favorite_DownloadButton from "../components/Category/Favorite_DownloadButton.jsx";
import { MarginOutlined } from "@mui/icons-material";

const CategoryPage = () => {
  const { large, middle, small, rank } = useParams();
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

  const dispatch = useDispatch();
  const logined_username = localStorage.getItem("username");

  const {
    productList,
    priceData,
    loading,
    error,
    countries,
    totalPageNum,
    timeIntervals,
  } = useSelector((state) => state.category);

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
        pageNum: value - 1,
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
        mt: "8rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CategoryDetail
        selectedLarge={selectedLarge}
        selectedMiddle={selectedMiddle}
        selectedSmall={selectedSmall}
        selectedRank={selectedRank}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        setSelectedLarge={setSelectedLarge}
        setSelectedMiddle={setSelectedMiddle}
        setSelectedSmall={setSelectedSmall}
        setSelectedRank={setSelectedRank}
        setSelectedStartDate={setSelectedStartDate}
        setSelectedEndDate={setSelectedEndDate}
      />

      <Favorite_DownloadButton
        selectedLarge={selectedLarge}
        selectedMiddle={selectedMiddle}
        selectedSmall={selectedSmall}
        selectedRank={selectedRank}
        logined_username={logined_username}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
      />

      <ProductListView productList={productList} pageNum={pageNum} />

      <Pagination
        count={totalPageNum}
        page={pageNum}
        onChange={handlePageChange}
        variant="outlined"
        sx={{ margin: "auto" }}
      />
      <PriceGraphView
        timeIntervals={timeIntervals}
        priceData={priceData}
        countries={countries}
      />
    </Box>
  );
};
export default CategoryPage;
