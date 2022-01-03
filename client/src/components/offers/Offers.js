import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Container } from "@mui/material";

import Loading from "../loading/Loading";
import { getMyOffers } from "../../actions/exchangeActions";

const Offers = (props) => {
    useEffect(() => {
        props.getMyOffers();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let renderOffers;

    if (props.myOffersLoading) {
        renderOffers = <Loading />;
    } else if (props.myOffers.length === 0) {
        renderOffers = (
            <Typography mt={4} mb={3} variant="p" sx={{ fontWeight: 400 }}>
                Your do not have any offers
            </Typography>
        );
    }

    return (
        <Box mt={11}>
            <Container maxWidth="lg">
                <Typography mt={3} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
                    My Offers
                </Typography>
                {renderOffers}
            </Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        myOffers: state.exchange.myOffers,
        myOffersLoading: state.exchange.myOffersLoading,
    };
};

export default connect(mapStateToProps, { getMyOffers })(Offers);
