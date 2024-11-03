/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { colors } from "../../assets/assest";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.tableHead,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const ProductListView = ({ productList }) => {
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer
        sx={{
          marginTop: 2,
          marginBottom: 2,
        }}
      >
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>거래 ID</StyledTableCell>
              <StyledTableCell>거래 날짜</StyledTableCell>
              <StyledTableCell>거래 단위</StyledTableCell>
              <StyledTableCell>대분류</StyledTableCell>
              <StyledTableCell>거래 시장</StyledTableCell>
              <StyledTableCell>중분류</StyledTableCell>
              <StyledTableCell>가격</StyledTableCell>
              <StyledTableCell>상품 명</StyledTableCell>
              <StyledTableCell>상품 등급</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList && productList.length > 0 ? (
              productList.map((product, index) => (
                <TableRow key={product.Id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{product.productId}</TableCell>
                  <TableCell>
                    {new Date(product.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{product.del_unit}</TableCell>
                  <TableCell>{product.large}</TableCell>
                  <TableCell>{product.market_name}</TableCell>
                  <TableCell>{product.middle}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.rank}</TableCell>
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
