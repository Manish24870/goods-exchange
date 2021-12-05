import React, { useState } from "react";
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

import { registerUser } from "../../actions/authActions";

const Register = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const onFormValueChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.registerUser(formData, navigate);
    };

    return (
        <Box>
            <Container maxWidth="xs">
                <Box mt={5} textAlign="center">
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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email"
                                value={formData.email}
                                onChange={onFormValueChange}
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

export default connect(null, { registerUser })(Register);
