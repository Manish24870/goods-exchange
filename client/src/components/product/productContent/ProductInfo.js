import React from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions, CardMedia, Grid } from "@mui/material";

import ProductActions from "./productActions/ProductActions";
import ProductTypeList from "./productTypeList/ProductTypeList";

const ProductInfo = (props) => {
    return (
        <Box>
            <ProductActions />
            <Card variant="outlined" sx={{ borderRadius: "6px" }}>
                <CardContent>
                    <Typography mb={3} variant="h6" sx={{ fontWeight: 500 }}>
                        Details
                    </Typography>
                    <ProductTypeList title="Type:" />
                    <Box mb={2}>
                        <Typography variant="p" sx={{ opacity: "90%" }}>
                            Condition:
                        </Typography>
                        <Typography variant="p">
                            <Button
                                color="info"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                {"product.productDetails.condition"}
                            </Button>
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="p" sx={{ opacity: "90%" }}>
                            Used For:
                        </Typography>
                        <Typography variant="p">
                            <Button
                                color="info"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                {"product.productDetails.usedFor"}
                            </Button>
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="p" sx={{ opacity: "90%" }}>
                            Warrenty:
                        </Typography>
                        <Typography variant="p">
                            <Button
                                color="info"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                {'product.productDetails.warrenty ? "Yes" : "No"'}
                            </Button>
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography variant="p" sx={{ opacity: "90%" }}>
                            Time Remaining:
                        </Typography>
                        <Typography variant="p">
                            <Button
                                color="info"
                                sx={{
                                    textTransform: "none",
                                }}
                            >
                                {"product.productDetails.timeRemaining"}
                            </Button>
                        </Typography>
                    </Box>

                    <ProductTypeList title="Additionals:" />

                    <ProductTypeList title="Exchange With:" />
                </CardContent>
            </Card>
            {"selectDialog()"}
        </Box>
    );
};

export default ProductInfo;
