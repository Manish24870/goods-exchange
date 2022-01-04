import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Container } from "@mui/material";

import InitiateItem from "./InitiateItem";
import Loading from "../loading/Loading";
import { getMyInitiates } from "../../actions/exchangeActions";

const Initiates = (props) => {
  useEffect(() => {
    props.getMyInitiates();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let renderInitiates;

  if (props.myInitiatesLoading) {
    renderInitiates = <Loading />;
  } else if (props.myInitiates.length === 0) {
    renderInitiates = (
      <Typography mt={4} mb={3} variant="p" sx={{ fontWeight: 400 }}>
        Your have not initiated any exchanges
      </Typography>
    );
  } else {
    renderInitiates = props.myInitiates.map((initiate) => {
      return (
        <InitiateItem
          key={initiate._id}
          product={initiate}
          loggedInUserId={props.loggedInUserId}
          loggedInUserData={props.loggedInUserData}
        />
      );
    });
  }

  return (
    <Box mt={11}>
      <Container maxWidth="lg">
        <Typography mt={3} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
          My Initiates
        </Typography>
        <Container>{renderInitiates}</Container>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    myInitiates: state.exchange.myInitiates,
    myInitiatesLoading: state.exchange.myInitiatesLoading,
    loggedInUserId: state.auth.user.id,
    loggedInUserData: state.auth.userInfo,
  };
};

export default connect(mapStateToProps, { getMyInitiates })(Initiates);
