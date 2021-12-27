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
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";

import isEmpty from "../../utils/isEmpty";
import { loginUser, clearErrors } from "../../actions/authActions";

// LOGIN COMPONENT
const Login = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
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
        props.loginUser(formData, navigate);
    };

    return (
        <Box mt={11}>
            <Container maxWidth="xs">
                <Box textAlign="center">
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
                        Login
                    </Typography>
                </Box>
                <Box component="form" autoComplete="off" noValidate mt={4} onSubmit={onFormSubmit}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="usernameOrEmail"
                                label="Username or Email"
                                value={formData.usernameOrEmail}
                                onChange={onFormValueChange}
                                error={errorMessages.usernameOrEmail ? true : false}
                                helperText={
                                    errorMessages.usernameOrEmail
                                        ? errorMessages.usernameOrEmail
                                        : null
                                }
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
                            <FormControlLabel control={<Checkbox />} label="Remember me" />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                                size="large"
                                sx={{ mt: 0 }}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                            <Typography
                                component="span"
                                variant="span"
                                sx={{ mr: 1, opacity: 0.7 }}
                            >
                                Don't have an account?
                            </Typography>
                            <MaterialLink component={Link} to="/auth/register" underline="hover">
                                Register
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

export default connect(mapStateToProps, { loginUser, clearErrors })(Login);
