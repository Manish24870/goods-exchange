import React from "react";
import { Grid } from "@mui/material";

import ProductDescription from "./ProductDescription";
import ProductInfo from "./ProductInfo";

const ProductContent = (props) => {
  return (
    <Grid container mt={4} sx={{ justifyContent: "space-between" }}>
      <Grid item xs={12} sm={12} md={6}>
        <ProductDescription
          product={props.product}
          currentUserInfo={props.currentUserInfo}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={5}>
        <ProductInfo
          product={props.product}
          currentUserInfo={props.currentUserInfo}
        />
      </Grid>
    </Grid>
  );
};

export default ProductContent;
