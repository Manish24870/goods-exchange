import React, { useEffect } from "react";
import { Box, Container, Stack, Pagination } from "@mui/material";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import { getProducts } from "../../actions/productActions";

const Products = (props) => {
    useEffect(() => {
        props.getProducts();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let productContent;

    if (!props.products) {
        productContent = (
            <Box mt={11} mb={8}>
                <Container maxWidth="lg">
                    <h2>LOADING....</h2>
                </Container>
            </Box>
        );
    } else {
        productContent = <ProductList products={props.products} />;
    }

    return (
        <Box mt={11} mb={8}>
            <Container maxWidth="lg">
                {productContent}
                <Stack mt={6}>
                    <Pagination size="large" count={10} color="info" sx={{ margin: "0 auto" }} />
                </Stack>
            </Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        products: Object.values(state.product.products),
    };
};

export default connect(mapStateToProps, { getProducts })(Products);
