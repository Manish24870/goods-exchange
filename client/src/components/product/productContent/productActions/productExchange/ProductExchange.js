import React from "react";
import { connect } from "react-redux";
import { Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";

import ProductExchangeItem from "./ProductExchangeItem";
import Loading from "../../../../loading/Loading";
import { createNewExchange } from "../../../../../actions/exchangeActions";
import isEmpty from "../../../../../utils/isEmpty";

const ProductExchange = (props) => {
    const onExchangeItemSelect = (productGiven) => {
        const exchangeData = {
            productGiven,
            productWanted: props.productId,
            productOwner: props.productOwner,
        };
        props.createNewExchange(exchangeData, props.handleClose);
    };
    let renderMyProducts;

    if (props.loadingMyProducts) {
        renderMyProducts = <Loading />;
    } else if (isEmpty(props.myProducts)) {
        renderMyProducts = <DialogContent>You do not have any items</DialogContent>;
    } else {
        renderMyProducts = props.myProducts.map((product) => {
            return (
                <ProductExchangeItem
                    key={product._id}
                    onExchangeItemSelect={() => onExchangeItemSelect(product._id)}
                    product={product}
                />
            );
        });
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} maxWidth="xs" fullWidth={true}>
            <DialogTitle>Select your product</DialogTitle>
            {renderMyProducts}

            <DialogActions></DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return {
        loadingMyProducts: state.exchange.loadingMyProducts,
        myProducts: Object.values(state.exchange.myProducts),
        productId: state.product.product._id,
        productOwner: state.product.product.owner._id,
    };
};

export default connect(mapStateToProps, { createNewExchange })(ProductExchange);
