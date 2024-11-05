/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Box,
  Button,
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { colors } from "../../assets/assest";
import { useDispatch, useSelector } from "react-redux";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: colors.tableHead,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));
const ProductListView = ({ productList, pageNum }) => {
  const itemsPerPage = 10;
  const dispatch = useDispatch();

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
                <TableRow key={product.delId}>
                  <TableCell>
                    {(pageNum - 1) * itemsPerPage + index + 1}
                  </TableCell>

                  <TableCell>
                    {new Date(product.delDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{product.market_name}</TableCell>
                  <TableCell>{product.large}</TableCell>
                  <TableCell>{product.middle}</TableCell>
                  <TableCell>{product.productName}</TableCell>
                  <TableCell>{product.productRank}</TableCell>
                  <TableCell>{product.del_unit}</TableCell>
                  <TableCell>{product.price}</TableCell>
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
