import React, { useEffect } from "react";
import { Box, Container, Stack, Pagination } from "@mui/material";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import { getProducts } from "../../actions/productActions";

const Products = (props) => {
    useEffect(() => {
        props.getProducts();
    }, []);

    return (
        <Box mt={11} mb={8}>
            <Container maxWidth="lg">
                <ProductList />
                {/* <Stack mt={6}>
                    <Pagination size="large" count={10} color="info" sx={{ margin: "0 auto" }} />
                </Stack> */}
            </Container>
        </Box>
    );
};

export default connect(null, { getProducts })(Products);
