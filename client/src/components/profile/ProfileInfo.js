import React from "react";
import { Link } from "react-router-dom";
import { Box, Avatar, Typography, Grid } from "@mui/material";
import { Email, Phone, LocationOn, BarChart } from "@mui/icons-material";

const ProfileInfo = (props) => {
    console.log(props.userInfo);
    const calculateReputation = (rep) => {
        if (rep >= 0 && rep <= 30) {
            return <p style={{ color: "#FF5F5F" }}>{`Bad [${rep}]`}</p>;
        } else if (rep >= 31 && rep <= 60) {
            return <p style={{ color: "#70beb4" }}>{`Average [${rep}]`}</p>;
        } else {
            return <p style={{ color: "#109382" }}>{`Good [${rep}]`}</p>;
        }
    };

    return (
        <Grid container sx={{ display: "flex" }}>
            <Grid item xs={2} sx={{ marginRight: 2 }}>
                <Avatar
                    variant="rounded"
                    alt={props.userInfo.username}
                    src={"https://picsum.photos/400/400"}
                    sx={{
                        width: 170,
                        height: 170,
                    }}
                ></Avatar>
            </Grid>
            <Grid mt={2} xs={8} item>
                <Typography variant="h4" sx={{ fontWeight: "600" }}>
                    {props.userInfo.username}
                </Typography>
                <Grid container sx={{ display: "flex", marginTop: 4 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", marginRight: 4 }}>
                        <Typography
                            variant="p"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 2,
                            }}
                        >
                            <Email sx={{ color: "#6325A9", marginRight: 1 }} />
                            <Typography variant="p">
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "rgba(0, 0, 0, 0.87)",
                                    }}
                                    to="#"
                                    onClick={(e) => {
                                        window.location = `mailto:${props.userInfo.email}`;
                                        e.preventDefault();
                                    }}
                                >
                                    {props.userInfo.email}
                                </Link>
                            </Typography>
                        </Typography>
                        <Typography variant="p" sx={{ display: "flex", alignItems: "center" }}>
                            <Phone sx={{ color: "#6325A9", marginRight: 1 }} />
                            <Typography variant="p">
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: "rgba(0, 0, 0, 0.87)",
                                    }}
                                    to="#"
                                    onClick={(e) => {
                                        window.location = `tel:+977-${props.userInfo.phone}`;
                                        e.preventDefault();
                                    }}
                                >
                                    {props.userInfo.phone}
                                </Link>
                            </Typography>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            variant="p"
                            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
                        >
                            <LocationOn sx={{ color: "#6325A9", marginRight: 1 }} />
                            <Typography variant="p">{props.userInfo.location}</Typography>
                        </Typography>
                        <Typography variant="p" sx={{ display: "flex", alignItems: "center" }}>
                            <BarChart sx={{ color: "#6325A9", marginRight: 1 }} />
                            <Typography variant="p">
                                {calculateReputation(props.userInfo.reputation)}
                            </Typography>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ProfileInfo;
