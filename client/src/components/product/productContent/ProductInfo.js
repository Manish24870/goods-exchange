import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ProductActions from "./productActions/ProductActions";
import ProductDetailsList from "./productDetailsList/ProductDetailsList";

const ProductInfo = (props) => {
  const renderDetails = Object.keys(props.product.details).map((detail) => {
    return (
      <ProductDetailsList
        title={detail}
        key={detail}
        value={props.product.details[detail]}
      />
    );
  });
  let renderActions;
  if (props.currentUserInfo._id === props.product.owner._id) {
    renderActions = null;
  } else {
    renderActions = <ProductActions />;
  }

  return (
    <Box>
      {renderActions}
      <Card variant="outlined" sx={{ borderRadius: "6px" }}>
        <CardContent>
          <Typography mb={3} variant="h6" sx={{ fontWeight: 500 }}>
            Details
          </Typography>

          {renderDetails}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductInfo;
