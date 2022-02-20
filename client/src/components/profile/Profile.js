import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@mui/material";

import ProfileInfo from "./ProfileInfo";
import MyProducts from "./myProducts/MyProducts";
import ReceivedReviews from "./ReceivedReviews";
import Loading from "../loading/Loading";
import { getMyProducts } from "../../actions/exchangeActions";

const Profile = (props) => {
  // Get users products on profile render
  useEffect(() => {
    props.getMyProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let profileRender;

  if (props.userLoading || props.userInfoLoading || props.myProductsLoading) {
    profileRender = <Loading />;
  } else {
    profileRender = (
      <React.Fragment>
        <ProfileInfo userInfo={props.userInfo} />
        <MyProducts myProducts={props.myProducts} />
        <ReceivedReviews reviews={props.userInfo.reviews} />
      </React.Fragment>
    );
  }

  return (
    <Box mt={11}>
      <Container maxWidth="lg">{profileRender}</Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userLoading: state.auth.userLoading,
    userInfo: state.auth.userInfo,
    userInfoLoading: state.auth.userInfoLoading,
    myProducts: Object.values(state.exchange.myProducts),
    myProductsLoading: state.exchange.myProductsLoading,
  };
};

export default connect(mapStateToProps, { getMyProducts })(Profile);
