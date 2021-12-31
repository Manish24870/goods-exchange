import React from "react";
import { Box, Grid } from "@mui/material";

import ProductItem from "./ProductItem";

const ProductList = () => {
    return (
        <Box mt={5}>
            <Grid container spacing={5}>
                <Grid key={"product.id"} item xs={4}>
                    <ProductItem product={"product"} />
                </Grid>
                <Grid key={"product.id2"} item xs={4}>
                    <ProductItem product={"product"} />
                </Grid>
                <Grid key={"product.id3"} item xs={4}>
                    <ProductItem product={"product"} />
                </Grid>
                <Grid key={"product.id4"} item xs={4}>
                    <ProductItem product={"product"} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductList;
