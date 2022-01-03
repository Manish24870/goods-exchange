import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { Box, Card, Button, CardMedia, CardContent, Avatar, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const FavoriteItem = (props) => {
    console.log(props.favorite);
    return (
        <Box>
            <Card>
                <CardMedia
                    component="img"
                    height="170"
                    image={"https://picsum.photos/400/400"}
                    alt={props.product.name}
                />

                <CardContent>
                    <Box>
                        <Typography variant="h6">{props.product.name}</Typography>
                    </Box>
                    <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            alt={props.product.name}
                            src={"product.posterDetails.photo"}
                            sx={{ bgcolor: "#2196f3" }}
                        />
                        <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                            <Typography variant="p">{props.owner.username}</Typography>
                            <Typography variant="p" sx={{ opacity: "90%", fontSize: "0.81em" }}>
                                {moment(props.product.postedAt).format("MMM Do YYYY, h:mm a")}
                            </Typography>
                        </Box>
                    </Box>
                    <Box mt={3} sx={{ minHeight: "60px" }}>
                        <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                            {props.product.description.length > 101
                                ? props.product.description.slice(0, 102) + " ..."
                                : props.product.description}
                        </Typography>
                    </Box>
                    <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                        <Button
                            component={Link}
                            to={`/products/${props.product._id}`}
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

export default FavoriteItem;
