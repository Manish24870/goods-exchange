import React from "react";
import { connect } from "react-redux";

import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import ProductExchangeItem from "./ProductExchangeItem";
import { createNewExchange } from "../../../../../actions/exchangeActions";

const ProductExchange = (props) => {
    const onExchangeItemSelect = () => {
        props.createNewExchange();
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>Select your product</DialogTitle>
            <ProductExchangeItem onExchangeItemSelect={onExchangeItemSelect} />
            <ProductExchangeItem onExchangeItemSelect={onExchangeItemSelect} />

            <DialogActions></DialogActions>
        </Dialog>
    );
};

const mapStateToProps = (state) => {
    return {};
};

export default connect(null, { createNewExchange })(ProductExchange);
