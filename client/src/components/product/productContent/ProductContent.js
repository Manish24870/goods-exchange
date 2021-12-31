import React from "react";
import { Grid } from "@mui/material";

import ProductDescription from "./ProductDescription";
import ProductInfo from "./ProductInfo";

const ProductContent = (props) => {
    return (
        <Grid container mt={4} sx={{ justifyContent: "space-between" }}>
            <Grid item xs={6}>
                <ProductDescription productId={"props.productId"} />
            </Grid>
            <Grid item xs={5}>
                <ProductInfo productId={"props.productId"} />
            </Grid>
        </Grid>
    );
};

export default ProductContent;
