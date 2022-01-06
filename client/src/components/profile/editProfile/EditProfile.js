import React from "react";
import { connect } from "react-redux";
import { Box, Container, Typography } from "@mui/material";

import EditProfileForm from "./EditProfileForm";
import Loading from "../../loading/Loading";
import { clearErrors } from "../../../actions/errorActions";
import { updateUserProfile } from "../../../actions/authActions";

const EditProfile = (props) => {
  let editProfileRender;
  if (props.userLoading || props.userInfoLoading) {
    editProfileRender = <Loading />;
  } else {
    editProfileRender = (
      <EditProfileForm
        error={props.error}
        clearErrors={props.clearErrors}
        userInfo={props.userInfo}
        updateUserProfile={props.updateUserProfile}
      />
    );
  }

  return (
    <Box mt={11}>
      <Container maxWidth="lg">
        <Typography mt={3} mb={1} variant="h5" sx={{ fontWeight: 500 }}>
          Edit Your Profile
        </Typography>
        {editProfileRender}
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    userInfoLoading: state.auth.userInfoLoading,
    userLoading: state.auth.userLoading,
    error: state.error,
  };
};

export default connect(mapStateToProps, { clearErrors, updateUserProfile })(
  EditProfile
);
