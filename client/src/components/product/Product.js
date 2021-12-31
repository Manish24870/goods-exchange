import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Box } from "@mui/material";

import isEmpty from "../../utils/isEmpty";
import ProductImages from "./productImages/ProductImages";
import ProductContent from "./productContent/ProductContent";
import { getProduct } from "../../actions/productActions";

const Product = (props) => {
    const { productId } = useParams();

    useEffect(() => {
        props.getProduct(productId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let productContent;
    if (isEmpty(props.product)) {
        productContent = <h2>LOADING...</h2>;
    } else {
        productContent = (
            <React.Fragment>
                <ProductImages images={props.product.images} />
                <ProductContent product={props.product} />
            </React.Fragment>
        );
    }

    return (
        <Box mt={11}>
            <Container maxWidth="lg">{productContent}</Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        product: state.product.product,
    };
};

export default connect(mapStateToProps, { getProduct })(Product);
