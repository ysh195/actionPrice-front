/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { largeCategoryList } from "../../assets/assest.js";

import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMiddleCategories,
  fetchSmallCategories,
  fetchRankCategories,
  fetchProductList,
  fetchPriceData,
  clearProductList,
  clearPriceData,
} from "../../redux/slices/categorySlice";

import DateChange from "./DateChange.jsx";
import CategorySelect from "./CategorySelect.jsx";


const CategoryDetail = ({
  selectedLarge,
  selectedMiddle,
  selectedSmall,
  selectedRank,
  selectedStartDate,
  selectedEndDate,
  setSelectedLarge,
  setSelectedMiddle,
  setSelectedSmall,
  setSelectedRank,
  setSelectedStartDate,
  setSelectedEndDate,
}) => {
  const { large, middle, small, rank } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 


  const [searchParams, setSearchParams] = useSearchParams();
  const pageNum = parseInt(searchParams.get("pageNum")) || 1;



  const { middleCategoryList, smallCategoryList, rankList } = useSelector(
    (state) => state.category
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
      fetchProductList({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
        pageNum: pageNum - 1, 
      })
    );
    dispatch(
      fetchPriceData({
        large: selectedLarge,
        middle: selectedMiddle,
        small: selectedSmall,
        rank: selectedRank,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
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
    dispatch(clearPriceData());
    navigate(`/api/category/:large`);
  };

  return (
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

      <CategorySelect
        label="중분류를 선택하세요"
        value={selectedMiddle}
        handleCategoryChange={handleCategoryChange}
        categoryList={middleCategoryList}
        categoryType="middle"
      />

      <CategorySelect
        label="소분류를 선택하세요"
        value={selectedSmall}
        handleCategoryChange={handleCategoryChange}
        categoryList={smallCategoryList}
        categoryType="small"
      />

      <CategorySelect
        label="등급을 선택하세요"
        value={selectedRank}
        handleCategoryChange={handleCategoryChange}
        categoryList={rankList}
        categoryType="rank"
      />

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
            !selectedLarge || !selectedMiddle || !selectedSmall || !selectedRank
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
  );
};
export default CategoryDetail;
