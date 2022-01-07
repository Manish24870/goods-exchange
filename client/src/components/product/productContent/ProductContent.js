import React from "react";
import { Grid } from "@mui/material";

import ProductDescription from "./ProductDescription";
import ProductInfo from "./ProductInfo";

const ProductContent = (props) => {
  return (
    <Grid container mt={4} sx={{ justifyContent: "space-between" }}>
      <Grid item xs={6}>
        <ProductDescription product={props.product} />
      </Grid>
      <Grid item xs={5}>
        <ProductInfo
          product={props.product}
          currentUserInfo={props.currentUserInfo}
        />
      </Grid>
    </Grid>
  );
};

export default ProductContent;
