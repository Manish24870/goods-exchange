import React from "react";
import { Box, Grid } from "@mui/material";

import ProductItem from "./ProductItem";

const ProductList = (props) => {
  const productList = props.products.map((product) => {
    return (
      <Grid key={product._id} item xs={4}>
        <ProductItem
          product={product}
          currentUserInfo={props.currentUserInfo}
        />
      </Grid>
    );
  });

  return (
    <Box mt={5}>
      <Grid container spacing={5}>
        {productList}
      </Grid>
    </Box>
  );
};

export default ProductList;
