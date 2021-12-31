import React from "react";
import { Link } from "react-router-dom";
import { Box, Card, Button, CardMedia, CardContent, Avatar, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const ProductItem = (props) => {
    return (
        <Box>
            <Card>
                <CardMedia
                    component="img"
                    height="200"
                    image={"product.productImages[0].url"}
                    alt="Product1"
                />

                <CardContent>
                    <Box>
                        <Typography variant="h6">{"product.name"}</Typography>
                    </Box>
                    <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            alt={"product.name"}
                            src={"product.posterDetails.photo"}
                            sx={{ bgcolor: "#2196f3" }}
                        />
                        <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="p">{"product.posterDetails.name"}</Typography>
                            <Typography variant="p" sx={{ opacity: "90%", fontSize: "0.81em" }}>
                                {"product.postedDate.toUTCString().slice(0, 26)"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={3}>
                        <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                            {"product.description.slice(0, 122) + ' ...'"}
                        </Typography>
                    </Box>
                    <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            size="large"
                            variant="outlined"
                            color="secondary"
                            sx={{ textTransform: "none", marginRight: 2 }}
                            // onClick={"onFavoriteAdd"}
                        >
                            Favorite
                        </Button>
                        <Button
                            component={Link}
                            to={`/products/${"product.id"}`}
                            size="large"
                            variant="outlined"
                            sx={{ textTransform: "none" }}
                        >
                            Details
                            <ArrowForwardIos sx={{ fontSize: "1em", marginLeft: 1 }} />
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProductItem;
