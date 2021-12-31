import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import { Phone, Email, FmdGood, BarChart } from "@mui/icons-material";

import ExchangerDetailsItem from "./ExchangerDetailsItem";

const ExchangerDetails = (props) => {
    const onPhoneClick = (e) => {
        e.preventDefault();
        window.location = `tel:+977-${"product.posterDetails.contact"}`;
    };

    const onMailClick = (e) => {
        e.preventDefault();
        window.location = `mailto:${"product.posterDetails.email"}`;
    };

    return (
        <Box>
            <Typography mt={2} variant="h6" sx={{ fontWeight: 500 }}>
                Exchanger Details
            </Typography>
            <Grid container mt={0} spacing={1}>
                <ExchangerDetailsItem title="Contact" icon={Phone} onClick={onPhoneClick} />
                <ExchangerDetailsItem title="Email" icon={Email} onClick={onMailClick} />
                <ExchangerDetailsItem title="Location" icon={FmdGood} />
                <ExchangerDetailsItem title="Reputation" icon={BarChart} />
            </Grid>
        </Box>
    );
};

export default ExchangerDetails;
