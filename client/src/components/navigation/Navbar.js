import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
    AppBar,
    Button,
    Toolbar,
    Container,
    Box,
    SvgIcon,
    Menu,
    MenuItem,
    Tooltip,
    IconButton,
    Avatar,
} from "@mui/material";
import { AccountCircleOutlined, SettingsOutlined, ExitToAppOutlined } from "@mui/icons-material";

import { ReactComponent as LogoIcon } from "../../utils/icon/icon.svg";
import { logoutUser } from "../../actions/authActions";

const Navbar = (props) => {
    const [myAccountMenu, setMyAccountMenu] = useState(null);
    const open = Boolean(myAccountMenu);

    const handleMyAccountClick = (event) => {
        setMyAccountMenu(event.currentTarget);
    };

    const handleMyAccountClose = () => {
        setMyAccountMenu(null);
    };

    return (
        <AppBar position="fixed">
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/products">
                            <SvgIcon component={LogoIcon} viewBox="0 0 32 32" fontSize="large" />
                        </Button>
                        <React.Fragment>
                            <Button
                                component={Link}
                                to="/products"
                                sx={{
                                    textTransform: "none",
                                    marginRight: "2rem",
                                    marginLeft: 6,
                                }}
                                color="inherit"
                            >
                                Products
                            </Button>
                            <Button
                                component={Link}
                                to="/products/new"
                                sx={{
                                    textTransform: "none",
                                }}
                                color="inherit"
                            >
                                Add Product
                            </Button>
                        </React.Fragment>
                    </Box>

                    <Box>
                        {!props.auth.isAuthenticated ? (
                            <React.Fragment>
                                <Button
                                    component={Link}
                                    to="/auth/register"
                                    sx={{
                                        textTransform: "none",
                                    }}
                                    color="inherit"
                                >
                                    Register
                                </Button>
                                <Button
                                    component={Link}
                                    to="/auth/login"
                                    sx={{
                                        textTransform: "none",
                                        marginLeft: "2rem",
                                    }}
                                    color="inherit"
                                >
                                    Login
                                </Button>
                            </React.Fragment>
                        ) : (
                            <Tooltip title="My account">
                                <IconButton onClick={handleMyAccountClick} size="small">
                                    <Avatar
                                        sx={{ bgcolor: "#FF5F5F", height: "35px", width: "35px" }}
                                    >
                                        M
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    {props.auth.isAuthenticated ? (
                        <Menu
                            anchorEl={myAccountMenu}
                            open={open}
                            onClick={handleMyAccountClose}
                            onClose={handleMyAccountClose}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem component={Link} to="/profile">
                                <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                                My Profile
                            </MenuItem>
                            <MenuItem>
                                <SettingsOutlined fontSize="small" sx={{ mr: 1 }} />
                                Settings
                            </MenuItem>
                            <MenuItem onClick={props.logoutUser}>
                                <ExitToAppOutlined fontSize="small" sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    ) : null}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps, { logoutUser })(Navbar);
