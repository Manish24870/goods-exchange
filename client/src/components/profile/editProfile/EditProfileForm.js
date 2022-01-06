import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Grid, Button, Avatar } from "@mui/material";

import isEmpty from "../../../utils/isEmpty";

const EditProfileForm = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    location: "",
    phone: "",
    profileImage: "",
    userImage: [],
  });
  const [errorMessages, setErrorMessages] = useState({});

  // Hook for getting error message
  useEffect(() => {
    setErrorMessages({});
    if (!isEmpty(props.error)) {
      setErrorMessages(props.error.data.errors);
    }
  }, [props.error]);

  // Hook for removing errors when component unmounts
  // also for loading initial form data
  useEffect(() => {
    const newFormData = {};
    Object.keys(formData).forEach((el) => {
      if (!isEmpty(props.userInfo[el])) {
        newFormData[el] = props.userInfo[el];
      }
    });
    setFormData({ ...formData, ...newFormData });

    return () => {
      props.clearErrors();
    };
  }, [props.userInfo]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormValueChange = (e) => {
    if (e.target.name === "userImage") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    let newFormData = new FormData();
    Object.keys(formData).forEach((value) => {
      if (value === "userImage") {
        newFormData.append("userImage", formData.userImage);
      } else {
        newFormData.append([value], formData[value]);
      }
    });
    props.updateUserProfile(newFormData, navigate);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      mt={2}
      onSubmit={onFormSubmit}
      encType="multipart/form-data"
    >
      <Avatar
        alt={props.userInfo.username}
        src={process.env.REACT_APP_BASE_IMAGE_URL + formData.profileImage}
        sx={{
          width: 140,
          height: 140,
          marginBottom: 1,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      ></Avatar>
      <Box textAlign="center">
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="profile-upload-button"
          type="file"
          name="userImage"
          onChange={onFormValueChange}
        />
        <label htmlFor="profile-upload-button">
          <Button
            variant="outlined"
            component="span"
            color="info"
            size="small"
            sx={{ textTransform: "none" }}
          >
            Upload New Avatar
          </Button>
        </label>
      </Box>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
        }}
      >
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="username"
                label="New Username"
                value={formData.username}
                onChange={onFormValueChange}
                error={errorMessages.username ? true : false}
                helperText={
                  errorMessages.username ? errorMessages.username : null
                }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="New Password"
                value={formData.password}
                onChange={onFormValueChange}
                error={errorMessages.password ? true : false}
                helperText={
                  errorMessages.password ? errorMessages.password : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                name="passwordConfirm"
                label="New Confirm Password"
                value={formData.passwordConfirm}
                onChange={onFormValueChange}
                error={errorMessages.passwordConfirm ? true : false}
                helperText={
                  errorMessages.passwordConfirm
                    ? errorMessages.passwordConfirm
                    : null
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                label="New Email"
                value={formData.email}
                onChange={onFormValueChange}
                error={errorMessages.email ? true : false}
                helperText={errorMessages.email ? errorMessages.email : null}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="location"
                label="New Location"
                value={formData.location}
                onChange={onFormValueChange}
                error={errorMessages.location ? true : false}
                helperText={
                  errorMessages.location ? errorMessages.location : null
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="phone"
                label="New Phone"
                value={formData.phone}
                onChange={onFormValueChange}
                error={errorMessages.phone ? true : false}
                helperText={errorMessages.phone ? errorMessages.phone : null}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Button
        type="submit"
        color="primary"
        variant="contained"
        size="large"
        sx={{ mt: 4 }}
      >
        Edit
      </Button>
    </Box>
  );
};

export default EditProfileForm;
