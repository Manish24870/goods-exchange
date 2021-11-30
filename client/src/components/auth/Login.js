import React from "react";
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

const Login = () => {
    return (
        <Box>
            <Container maxWidth="xs">
                <Box mt={5} textAlign="center">
                    <Typography component="h1" variant="h4" sx={{ fontWeight: 500 }}>
                        Register
                    </Typography>
                </Box>
                <Box component="form" noValidate mt={4}>
                    <Grid container justifyContent="center" spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth name="username" label="Username or Email" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth type="password" name="password" label="Password" />
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

export default Login;
