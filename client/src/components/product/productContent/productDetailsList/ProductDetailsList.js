import React from "react";
import moment from "moment";
import { Box, Typography, Button } from "@mui/material";

const ProductDetailsList = (props) => {
  // Return time remaining on expiry of product
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

  //   Format titles like Condition, type etc
  const formatTitle = (text) => {
    text = text.replace(/([A-Z])/g, " $1");
    text = text.charAt(0).toUpperCase() + text.slice(1);
    return text + "  :";
  };

  let listItem;
  if (typeof props.value === "object") {
    // If items are in array, render their values
    listItem = props.value.map((el) => (
      <Button
        key={el}
        color="info"
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
    // If items are string
    listItem = (
      <Button
        color="info"
        variant="text"
        size="small"
        sx={{
          textTransform: "none",
          marginRight: 2,
          fontSize: "0.9em",
        }}
      >
        {/* Only format expiry date, dont format others */}
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
