import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import { CompareArrowsOutlined, FavoriteBorderOutlined, Favorite } from "@mui/icons-material";

import ProductExchange from "./productExchange/ProductExchange";
import { favoriteProduct } from "../../../../actions/productActions";
import { getMyProducts } from "../../../../actions/exchangeActions";

const ProductActions = (props) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(true);
        props.getMyProducts();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onFavoriteClick = () => {
        props.favoriteProduct(props.productId);
    };

    const checkFavorites = () => {
        if (props.userFavorites.some((el) => el.productId === props.productId)) {
            return (
                <React.Fragment>
                    <Favorite sx={{ marginRight: 1 }} />
                    Unfavorite
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <FavoriteBorderOutlined sx={{ marginRight: 1 }} />
                    Favorite
                </React.Fragment>
            );
        }
    };

    return (
        <Box mb={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
                onClick={handleClickOpen}
                variant="contained"
                size="large"
                sx={{
                    textTransform: "none",
                    marginRight: 2,
                }}
            >
                <CompareArrowsOutlined sx={{ marginRight: 1 }} />
                Exchange
            </Button>
            <Button
                variant="contained"
                size="large"
                color="secondary"
                sx={{
                    textTransform: "none",
                }}
                onClick={onFavoriteClick}
            >
                {checkFavorites()}
            </Button>
            <ProductExchange open={open} handleClose={handleClose} />
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        productId: state.product.product._id,
        userId: state.auth.user.id,
        userFavorites: state.auth.userInfo.favorites,
    };
};

export default connect(mapStateToProps, { favoriteProduct, getMyProducts })(ProductActions);
