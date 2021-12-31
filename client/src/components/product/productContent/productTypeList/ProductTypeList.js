import React from "react";
import { Box, Typography, Button } from "@mui/material";

const ProductTypeList = (props) => {
    return (
        <Box mb={2}>
            <Typography variant="p" sx={{ opacity: "90%" }}>
                {props.title}
            </Typography>
            <Typography variant="p" ml={2}>
                {/* <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        marginRight: 2,
                    }}
                >
                    {"product.productDetails.exchangeWith[0]"}
                </Button> */}
                <Button
                    color="secondary"
                    variant="outlined"
                    size="small"
                    sx={{
                        textTransform: "none",
                        marginRight: 2,
                    }}
                >
                    {"product.productDetails.exchangeWith[1]"}
                </Button>
            </Typography>
        </Box>
    );
};

export default ProductTypeList;
