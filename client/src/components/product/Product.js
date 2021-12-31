import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/material";

import ProductImages from "./productImages/ProductImages";
import ProductContent from "./productContent/ProductContent";

const Product = (props) => {
    return (
        <Box mt={11}>
            <Container maxWidth="lg">
                <ProductImages productId={"productId"} />
                <ProductContent productId={"productId"} />
                {/* <ProductQuestions productId={productId} /> */}
            </Container>
        </Box>
    );
};

export default Product;
