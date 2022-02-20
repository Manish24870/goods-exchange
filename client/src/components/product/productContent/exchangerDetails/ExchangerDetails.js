import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Phone, Email, FmdGood, BarChart } from "@mui/icons-material";

import ExchangerDetailsItem from "./ExchangerDetailsItem";

const ExchangerDetails = (props) => {
  // When user clicks on phone
  const onPhoneClick = (e) => {
    e.preventDefault();
    window.location = `tel:+977-${props.owner.phone}`;
  };

  // When user clicks on email
  const onMailClick = (e) => {
    e.preventDefault();
    window.location = `mailto:${props.owner.email}`;
  };

  // Calculate reputation color and text
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
          value={calculateReputation(props.owner.reputation)}
          icon={BarChart}
        />
      </Grid>
    </Box>
  );
};

export default ExchangerDetails;
