import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
// import { Dialog, DialogTitle, DialogContent, DialogActions, CardMedia, Grid } from "@mui/material";

import ProductActions from "./productActions/ProductActions";
import ProductDetailsList from "./productDetailsList/ProductDetailsList";

const ProductInfo = (props) => {
    const renderDetails = Object.keys(props.details).map((detail) => {
        return <ProductDetailsList title={detail} key={detail} value={props.details[detail]} />;
    });

    return (
        <Box>
            <ProductActions />
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
