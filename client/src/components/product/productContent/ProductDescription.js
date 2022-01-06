import React from "react";
import moment from "moment";
import { Box, Typography, Avatar, Divider } from "@mui/material";

import ExchangerDetails from "./exchangerDetails/ExchangerDetails";

const ProductDescription = (props) => {
  return (
    <Box>
      <Typography color="primary" variant="h5" sx={{ fontWeight: 600 }}>
        {props.product.name}
      </Typography>
      <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          alt={props.product.owner.username}
          src={
            process.env.REACT_APP_BASE_IMAGE_URL +
            props.product.owner.profileImage
          }
          sx={{
            marginRight: 2,
            height: "35px",
            width: "35px",
            bgcolor: "#6325A9",
          }}
        ></Avatar>
        <Typography variant="h6" sx={{ fontWeight: 400 }}>
          {props.product.owner.username}
        </Typography>
        <Typography
          variant="p"
          sx={{ opacity: "70%", fontSize: "0.9em", marginLeft: 2 }}
        >
          | &nbsp;&nbsp;&nbsp;
          {moment(props.product.postedAt).format("MMM Do YYYY, h:mm a")}
        </Typography>
      </Box>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <Box>
        <Typography mb={1} variant="h6" sx={{ fontWeight: 500 }}>
          Description
        </Typography>
        <Typography variant="p" sx={{ lineHeight: "1.5" }}>
          {props.product.description}
        </Typography>
      </Box>
      <ExchangerDetails owner={props.product.owner} />
    </Box>
  );
};

export default ProductDescription;
