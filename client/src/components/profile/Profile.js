import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Container } from "@mui/material";

import ProfileInfo from "./ProfileInfo";
import MyProducts from "./myProducts/MyProducts";
import Loading from "../loading/Loading";
import { getMyProducts } from "../../actions/exchangeActions";

const Profile = (props) => {
    useEffect(() => {
        props.getMyProducts();
        // props.getProduct(productId);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    let profileRender;

    if (props.userLoading || props.userInfoLoading || props.myProductsLoading) {
        profileRender = <Loading />;
    } else {
        profileRender = (
            <React.Fragment>
                <ProfileInfo userInfo={props.userInfo} />
                <MyProducts myProducts={props.myProducts} />
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
