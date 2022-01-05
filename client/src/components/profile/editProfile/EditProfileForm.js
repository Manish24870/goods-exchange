import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";

import isEmpty from "../../../utils/isEmpty";

const EditProfileForm = (props) => {
  console.log(props.clearErrors);
  const [formData, setFormData] = useState({
    newUsername: "",
    newEmail: "",
    newPassword: "",
    newPasswordConfirm: "",
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
  useEffect(() => {
    return () => {
      props.clearErrors();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFormValueChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    // props.registerUser(formData, navigate);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
      mt={4}
      onSubmit={onFormSubmit}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
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
                type="number"
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
        // fullWidth
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
