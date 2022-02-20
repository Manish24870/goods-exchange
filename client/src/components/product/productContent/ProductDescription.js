import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Typography, Avatar, Divider, Button } from "@mui/material";

import ExchangerDetails from "./exchangerDetails/ExchangerDetails";
import { deleteProduct, reportProduct } from "../../../actions/productActions";

const ProductDescription = (props) => {
  const navigate = useNavigate();

  // Only show delete button if current user is owner
  // Else, show report button
  const checkOwner = () => {
    if (props.product.owner._id === props.currentUserInfo._id) {
      return (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          sx={{ textTransform: "none", marginLeft: 2 }}
          onClick={() => props.deleteProduct(props.product._id, navigate)}
        >
          Delete
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          color="info"
          size="small"
          sx={{ textTransform: "none", marginLeft: 2 }}
          onClick={() => props.reportProduct(props.product._id)}
        >
          Report
        </Button>
      );
    }
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography color="primary" variant="h5" sx={{ fontWeight: 600 }}>
        {props.product.name}
        {checkOwner()}
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
      {/* Show details of the owner of products */}
      <ExchangerDetails owner={props.product.owner} />
    </Box>
  );
};

export default connect(null, { deleteProduct, reportProduct })(
  ProductDescription
);
