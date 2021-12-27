import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    Grid,
    TextField,
    Button,
    Link as MaterialLink,
} from "@mui/material";
import { Link } from "react-router-dom";

import isEmpty from "../../utils/isEmpty";
import { registerUser, clearErrors } from "../../actions/authActions";

// REGISTER COMPONENT
const Register = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
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
        props.registerUser(formData, navigate);
    };

    // const successfulLogin = () => {
    //     toast("Login Success");
    // };

    return (
        <Box mt={11}>
            <Container maxWidth="xs">
                <Box textAlign="center">
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
                        Register
                    </Typography>
                </Box>
                <Box component="form" autoComplete="off" noValidate mt={4} onSubmit={onFormSubmit}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={formData.username}
                                onChange={onFormValueChange}
                                error={errorMessages.username ? true : false}
                                helperText={errorMessages.username ? errorMessages.username : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={onFormValueChange}
                                error={errorMessages.email ? true : false}
                                helperText={errorMessages.email ? errorMessages.email : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                name="password"
                                label="Password"
                                value={formData.password}
                                onChange={onFormValueChange}
                                error={errorMessages.password ? true : false}
                                helperText={errorMessages.password ? errorMessages.password : null}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="password"
                                name="passwordConfirm"
                                label="Confirm Password"
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
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                                size="large"
                                sx={{ mt: 2 }}
                            >
                                Register
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Typography
                                component="span"
                                variant="span"
                                sx={{ mr: 1, opacity: 0.7 }}
                            >
                                Already have an account?
                            </Typography>
                            <MaterialLink component={Link} to="/auth/login" underline="hover">
                                Login
                            </MaterialLink>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.error,
    };
};

export default connect(mapStateToProps, { registerUser, clearErrors })(Register);
