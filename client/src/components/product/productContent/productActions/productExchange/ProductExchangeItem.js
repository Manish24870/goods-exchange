import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    DialogContent,
    CardMedia,
    Grid,
} from "@mui/material";

const ProductExchangeItem = (props) => {
    return (
        <Button
            size="small"
            variant="outlined"
            onClick={props.onExchangeItemSelect}
            sx={{
                width: "80%",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: 2,
            }}
        >
            <DialogContent>
                <Box>
                    <Card>
                        <Grid container>
                            <Grid item xs={5}>
                                <CardMedia
                                    component="img"
                                    // height="100"
                                    image={"product1.productImages[0].url"}
                                    alt="Product1"
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <CardContent>
                                    <Box>
                                        <Typography variant="p" sx={{ fontSize: "1.2em" }}>
                                            {"product1.name"}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
            </DialogContent>
        </Button>
    );
};

export default ProductExchangeItem;
