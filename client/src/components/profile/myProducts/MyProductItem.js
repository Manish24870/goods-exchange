import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

const MyProductItem = (props) => {
  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          height="180"
          image={
            process.env.REACT_APP_BASE_IMAGE_URL + props.product.images[0].url
          }
          alt={props.product.name}
        />

        <CardContent>
          <Box>
            <Typography variant="h6">{props.product.name}</Typography>
          </Box>
          <Box mt={3} sx={{ minHeight: "60px" }}>
            <Typography variant="p" sx={{ fontSize: "0.9em" }}>
              {props.product.description.length > 101
                ? props.product.description.slice(0, 102) + " ..."
                : props.product.description}
            </Typography>
          </Box>
          <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              component={Link}
              to={`/products/${props.product._id}`}
              variant="outlined"
              sx={{ textTransform: "none" }}
            >
              Details
              <ArrowForwardIos sx={{ fontSize: "1em", marginLeft: 1 }} />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyProductItem;
