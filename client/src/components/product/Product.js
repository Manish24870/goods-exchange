import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Box } from "@mui/material";

import isEmpty from "../../utils/isEmpty";
import ProductImages from "./productImages/ProductImages";
import ProductContent from "./productContent/ProductContent";
import ProductDiscussion from "./productDiscussion/ProductDiscussion";
import Loading from "../loading/Loading";
import { getProduct } from "../../actions/productActions";
import { getMyInitiates } from "../../actions/exchangeActions";

const Product = (props) => {
  const { productId } = useParams();

  useEffect(() => {
    props.getMyInitiates();
    props.getProduct(productId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let productContent;
  if (isEmpty(props.product)) {
    productContent = <Loading />;
  } else {
    productContent = (
      <React.Fragment>
        {/* Shows product images */}
        <ProductImages images={props.product.images} />
        {/* Shows product description and Info */}
        <ProductContent
          product={props.product}
          currentUserInfo={props.currentUserInfo}
        />
        {/* Shows product questions and answers */}
        <ProductDiscussion questions={props.product.questions} />
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
    currentUserInfo: state.auth.userInfo,
  };
};

export default connect(mapStateToProps, { getProduct, getMyInitiates })(
  Product
);
