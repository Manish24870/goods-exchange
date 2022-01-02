import React from "react";
import { connect } from "react-redux";
import { Box, Container } from "@mui/material";

import ProfileInfo from "./ProfileInfo";
import Loading from "../loading/Loading";

const Profile = (props) => {
    let profileRender;

    if (props.userLoading || props.userInfoLoading) {
        profileRender = <Loading />;
    } else {
        profileRender = <ProfileInfo userInfo={props.userInfo} />;
    }

    return (
        <Box mt={11}>
            <Container maxWidth="lg">
                {profileRender}
                {/* <MyProducts />
                <MyFavoriteProducts /> */}
            </Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        userLoading: state.auth.userLoading,
        userInfoLoading: state.auth.userInfoLoading,
        userInfo: state.auth.userInfo,
    };
};

export default connect(mapStateToProps)(Profile);
