/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,

  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { colors } from "../../assets/assest";

const StyledTableCell = (props) => (
  <TableCell
    {...props}
    sx={{
      fontWeight: "bold",
      backgroundColor: colors.primary,
      color: "white",
    }}
  />
);
const ProductListView = ({ productList, pageNum }) => {
  const itemsPerPage = 10;

  const formatToKoreanWon = (price) => {
    return new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
      minimumFractionDigits: 0, // No decimal places for KRW
    }).format(price);
  };
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      console.error("Invalid date:", date);
      return "Invalid Date"; // Return a fallback message
    }
    return parsedDate.toISOString().split("T")[0]; // Return formatted date
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>날짜</StyledTableCell>
              <StyledTableCell>거래시장</StyledTableCell>
              <StyledTableCell>대분류</StyledTableCell>
              <StyledTableCell>중분류</StyledTableCell>
              <StyledTableCell>소분류</StyledTableCell>
              <StyledTableCell>등급</StyledTableCell>
              <StyledTableCell>단위</StyledTableCell>
              <StyledTableCell>가격</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList && productList.length > 0 ? (
              productList.map((product, index) => (
                <TableRow
                  key={product.delId}
                  sx={{
                    "&:nth-of-type(even)": {
                      backgroundColor: "#f9f9f9",
                    },
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <TableCell>
                    {(pageNum - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{formatDate(product.delDate)}</TableCell>
                  <TableCell>{product.market_name}</TableCell>
                  <TableCell>{product.large}</TableCell>
                  <TableCell>{product.middle}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productRank}</TableCell>
                  <TableCell>{product.del_unit}</TableCell>
                  <TableCell>{formatToKoreanWon(product.price)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  검색 결과가 없습니다
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
export default ProductListView;
