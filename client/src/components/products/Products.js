import React, { useState, useEffect } from "react";
import { Box, Container, Stack, Pagination } from "@mui/material";
import { connect } from "react-redux";

import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import Loading from "../loading/Loading";
import { getProducts } from "../../actions/productActions";

const Products = (props) => {
  // For pagination
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // For search bar
  const [searchText, setSearchText] = useState("");
  const onSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  // Get all products when component mounts
  useEffect(() => {
    props.getProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let productContent;

  if (props.productsLoading) {
    productContent = <Loading />;
  } else if (props.products.length === 0) {
    productContent = <p>No products found</p>;
  } else if (searchText === "") {
    // If there is no search text, implement pagination
    const startingIndex = (page - 1) * 9;
    const endingIndex = startingIndex + 9;
    productContent = (
      <ProductList
        products={props.products.slice(startingIndex, endingIndex)}
        currentUserInfo={props.currentUserInfo}
      />
    );
  } else {
    // If any text is entered in search bar
    // const matchedProducts = props.products.filter((el) =>
    //   el.name.toLowerCase().includes(searchText.toLowerCase())
    // );
    const matchedProducts = props.products.filter(
      (el) =>
        el.name.toLowerCase().includes(searchText.toLowerCase()) ||
        el.details.kind.some((el2) =>
          el2.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    productContent = (
      <ProductList
        products={matchedProducts}
        currentUserInfo={props.currentUserInfo}
      />
    );
  }

  return (
    <Box mt={11} mb={8}>
      <Container maxWidth="lg">
        <ProductSearch
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
        />
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
