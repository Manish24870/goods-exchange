import React from "react";
import { Grid, Box, Typography } from "@mui/material";

import MyProductItem from "./MyProductItem";

const MyProducts = (props) => {
  const renderProducts = props.myProducts.map((product) => {
    return (
      <Grid key={product._id} item xs={12} sm={6} md={4}>
        <MyProductItem product={product} />
      </Grid>
    );
  });

  return (
    <Box mt={5}>
      <Typography mt={3} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
        My Products
      </Typography>
      <Grid container spacing={5} mb={6}>
        {renderProducts}
      </Grid>
    </Box>
  );
};

export default MyProducts;
