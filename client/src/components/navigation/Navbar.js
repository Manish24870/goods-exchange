import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    ListItemIcon,
} from "@mui/material";
import { AccountCircleOutlined, SettingsOutlined, ExitToAppOutlined } from "@mui/icons-material";

import { ReactComponent as LogoIcon } from "../../utils/icon/icon.svg";

const Navbar = () => {
    const [myAccountMenu, setMyAccountMenu] = useState(null);
    const open = Boolean(myAccountMenu);

    const handleMyAccountClick = (event) => {
        setMyAccountMenu(event.currentTarget);
    };

    const handleMyAccountClose = () => {
        setMyAccountMenu(null);
    };

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Button color="inherit" component={Link} to="/">
                            <SvgIcon component={LogoIcon} viewBox="0 0 32 32" fontSize="large" />
                        </Button>
                    </Box>

                    <Box>
                        <Button
                            component={Link}
                            to="/auth/register"
                            sx={{ textTransform: "none", fontFamily: "inherit" }}
                            color="inherit"
                        >
                            Register
                        </Button>
                        <Button
                            component={Link}
                            to="/auth/login"
                            sx={{
                                textTransform: "none",
                                fontFamily: "inherit",
                                marginLeft: "2rem",
                            }}
                            color="inherit"
                        >
                            Login
                        </Button>

                        {/* <Tooltip title="My account">
                            <IconButton onClick={handleMyAccountClick} size="small">
                                <Avatar sx={{ bgcolor: "#FF5F5F", height: "35px", width: "35px" }}>
                                    M
                                </Avatar>
                            </IconButton>
                        </Tooltip> */}
                    </Box>

                    {/* <Menu
                        anchorEl={myAccountMenu}
                        open={open}
                        onClick={handleMyAccountClose}
                        onClose={handleMyAccountClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem>
                            <AccountCircleOutlined fontSize="small" sx={{ mr: 1 }} />
                            My Profile
                        </MenuItem>
                        <MenuItem>
                            <SettingsOutlined fontSize="small" sx={{ mr: 1 }} />
                            Settings
                        </MenuItem>
                        <MenuItem>
                            <ExitToAppOutlined fontSize="small" sx={{ mr: 1 }} />
                            Logout
                        </MenuItem>
                    </Menu> */}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
