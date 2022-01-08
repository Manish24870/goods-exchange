import React, { useEffect } from "react";
import { Box, Container, Stack, Pagination } from "@mui/material";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import Loading from "../loading/Loading";
import { getProducts } from "../../actions/productActions";

const Products = (props) => {
  //For pagination
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    props.getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let productContent;

  if (props.productsLoading) {
    productContent = <Loading />;
  } else if (props.products.length === 0) {
    productContent = <p>No products found</p>;
  } else {
    const startingIndex = (page - 1) * 9;
    const endingIndex = startingIndex + 9;
    productContent = (
      <ProductList
        products={props.products.slice(startingIndex, endingIndex)}
        currentUserInfo={props.currentUserInfo}
      />
    );
  }

  return (
    <Box mt={11} mb={8}>
      <Container maxWidth="lg">
        {productContent}
        <Stack mt={6}>
          <Pagination
            size="large"
            count={10}
            color="info"
            page={page}
            onChange={handleChange}
            sx={{ margin: "0 auto" }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    products: Object.values(state.product.products),
    productsLoading: state.product.productsLoading,
    currentUserInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps, { getProducts })(Products);
