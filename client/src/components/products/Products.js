import React from "react";
import { Box, Container, Stack, Pagination } from "@mui/material";

import ProductList from "./ProductList";

const Products = () => {
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

export default Products;
