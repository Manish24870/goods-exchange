import React from "react";
import moment from "moment";
import { Box, Typography, Button } from "@mui/material";

const ProductDetailsList = (props) => {
    const formatExpiry = () => {
        let diffText;
        const x = new moment(props.value);
        const y = new moment();
        const diff = moment.duration(x.diff(y)).as("days");
        if (diff < 1) {
            diffText = `${Math.floor(moment.duration(x.diff(y)).as("hours"))} hours`;
        } else {
            diffText = `${Math.floor(diff)} days`;
        }
        return diffText;
    };

    const formatTitle = (text) => {
        text = text.replace(/([A-Z])/g, " $1");
        text = text.charAt(0).toUpperCase() + text.slice(1);
        return text + "  :";
    };

    let listItem;
    if (typeof props.value === "object") {
        listItem = props.value.map((el) => (
            <Button
                key={el}
                color="secondary"
                variant="outlined"
                size="small"
                sx={{
                    textTransform: "none",
                    marginRight: 2,
                    fontSize: "0.9em",
                }}
            >
                {el}
            </Button>
        ));
    } else {
        listItem = (
            <Button
                color="secondary"
                variant="text"
                size="small"
                sx={{
                    textTransform: "none",
                    marginRight: 2,
                    fontSize: "0.9em",
                }}
            >
                {props.title === "expiresIn" ? formatExpiry() : props.value}
            </Button>
        );
    }

    return (
        <Box mb={2}>
            <Typography variant="p" sx={{ opacity: "90%" }}>
                {formatTitle(props.title)}
            </Typography>
            <Typography variant="p" ml={2}>
                {listItem}
            </Typography>
        </Box>
    );
};

export default ProductDetailsList;
