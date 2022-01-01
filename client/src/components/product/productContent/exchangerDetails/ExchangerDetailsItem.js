import React from "react";
import { Link } from "react-router-dom";
import { Grid, Card, CardContent, Avatar, Box, Typography } from "@mui/material";

const ExchangerDetailsItem = (props) => {
    const Icon = props.icon;

    return (
        <Grid item xs={6}>
            <Card variant="outlined" sx={{ borderRadius: "6px" }}>
                <CardContent
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Avatar sx={{ height: "30px", width: "30px", bgcolor: "#6325A9" }}>
                            <Icon fontSize="small" />
                        </Avatar>
                    </Box>
                    <Box
                        ml={2}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            fontSize: "0.9em",
                        }}
                    >
                        <Typography variant="p" sx={{ opacity: "90%", marginBottom: 1 }}>
                            {props.title}
                        </Typography>
                        <Typography variant="p">
                            <Link
                                style={{
                                    textDecoration: "none",
                                    color: "rgba(0, 0, 0, 0.87)",
                                }}
                                to="#"
                                onClick={props.onClick}
                            >
                                {props.value}
                            </Link>
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ExchangerDetailsItem;
