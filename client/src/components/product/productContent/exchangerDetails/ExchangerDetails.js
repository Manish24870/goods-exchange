import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Phone, Email, FmdGood, BarChart } from "@mui/icons-material";

import ExchangerDetailsItem from "./ExchangerDetailsItem";

const ExchangerDetails = (props) => {
    const onPhoneClick = (e) => {
        e.preventDefault();
        window.location = `tel:+977-${props.owner.phone}`;
    };

    const onMailClick = (e) => {
        e.preventDefault();
        window.location = `mailto:${props.owner.email}`;
    };

    return (
        <Box>
            <Typography mt={2} variant="h6" sx={{ fontWeight: 500 }}>
                Exchanger Details
            </Typography>
            <Grid container mt={0} spacing={1}>
                <ExchangerDetailsItem
                    title="Contact"
                    value={props.owner.phone}
                    icon={Phone}
                    onClick={onPhoneClick}
                />
                <ExchangerDetailsItem
                    title="Email"
                    value={props.owner.email}
                    icon={Email}
                    onClick={onMailClick}
                />
                <ExchangerDetailsItem
                    title="Location"
                    value={props.owner.location}
                    icon={FmdGood}
                />
                <ExchangerDetailsItem
                    title="Reputation"
                    value={props.owner.reputation}
                    icon={BarChart}
                />
            </Grid>
        </Box>
    );
};

export default ExchangerDetails;
