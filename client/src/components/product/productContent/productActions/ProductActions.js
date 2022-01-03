import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, Button } from "@mui/material";
import { CompareArrowsOutlined, FavoriteBorderOutlined, Favorite } from "@mui/icons-material";

import ProductExchange from "./productExchange/ProductExchange";
import { favoriteProduct } from "../../../../actions/productActions";
import { getMyProducts, createNewExchange } from "../../../../actions/exchangeActions";
import createToast from "../../../../utils/toast/createToast";

const ProductActions = (props) => {
    const [open, setOpen] = useState(false);

    // Open dialog when initiating exchange
    const handleClickOpenUnexchanged = (e) => {
        e.preventDefault();
        if (!props.isAuthenticated) {
            createToast("You are not logged in", "error");
        } else {
            setOpen(true);
            props.getMyProducts();
        }
    };

    // Dont open dialog when cancelling exchange
    const handleClickOpenExchanged = (e) => {
        e.preventDefault();
        if (!props.isAuthenticated) {
            createToast("You are not logged in", "error");
        } else {
            const exchangeData = {
                productWanted: props.productId,
            };
            props.createNewExchange(exchangeData);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onFavoriteClick = () => {
        const favoriteDetails = {
            productId: props.productId,
            productOwnerId: props.productOwnerId,
        };
        props.favoriteProduct(favoriteDetails);
    };

    // Check if the product is already favorited
    const checkFavorites = () => {
        if (
            props.userFavorites &&
            props.userFavorites.some((el) => el.product === props.productId)
        ) {
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

    // Check if the exchange is already initiated with this product
    const checkExchanges = () => {
        if (
            props.myInitiates &&
            props.myInitiates.some((el1) => {
                return el1.initiator.some(
                    (el2) =>
                        el2.initiatorId === props.userId &&
                        el1.productWanted._id === props.productId
                );
            })
        ) {
            return (
                <Button
                    onClick={handleClickOpenExchanged}
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none",
                        marginRight: 2,
                    }}
                >
                    <CompareArrowsOutlined sx={{ marginRight: 1 }} />
                    Cancel
                </Button>
            );
        } else {
            return (
                <Button
                    onClick={handleClickOpenUnexchanged}
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none",
                        marginRight: 2,
                    }}
                >
                    <React.Fragment>
                        <CompareArrowsOutlined sx={{ marginRight: 1 }} />
                        Exchange
                    </React.Fragment>
                </Button>
            );
        }
    };

    return (
        <Box mb={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
            {checkExchanges()}
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
        productOwnerId: state.product.product.owner._id,
        userId: state.auth.user.id,
        userFavorites: state.auth.userInfo.favorites,
        isAuthenticated: state.auth.isAuthenticated,
        myInitiates: state.exchange.myInitiates,
    };
};

export default connect(mapStateToProps, { favoriteProduct, getMyProducts, createNewExchange })(
    ProductActions
);
