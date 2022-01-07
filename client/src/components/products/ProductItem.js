import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Card,
  Button,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";

import { favoriteProduct } from "../../actions/productActions";

const ProductItem = (props) => {
  const onFavoriteClick = () => {
    const favoriteData = {
      productId: props.product._id,
      productOwnerId: props.product.owner._id,
    };
    props.favoriteProduct(favoriteData);
  };

  const checkFavorites = () => {
    if (
      props.userFavorites &&
      props.userFavorites.some((el) => el.product === props.product._id)
    ) {
      return "Unfavorite";
    } else {
      return "Favorite";
    }
  };

  return (
    <Box>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={
            process.env.REACT_APP_BASE_IMAGE_URL + props.product.images[0].url
          }
          alt={props.product.name}
        />

        <CardContent>
          <Box>
            <Typography variant="h6">{props.product.name}</Typography>
          </Box>
          <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={props.product.owner.name}
              src={
                process.env.REACT_APP_BASE_IMAGE_URL +
                props.product.owner.profileImage
              }
              sx={{ bgcolor: "#6325A9" }}
            />
            <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="p">
                {props.product.owner.username}
              </Typography>
              <Typography
                variant="p"
                sx={{ opacity: "90%", fontSize: "0.81em" }}
              >
                {moment(props.product.postedAt).format("MMM Do YYYY, h:mm a")}
              </Typography>
            </Box>
          </Box>
          <Box mt={3} sx={{ minHeight: "60px" }}>
            <Typography variant="p" sx={{ fontSize: "0.9em", height: "60px" }}>
              {props.product.description.length > 101
                ? props.product.description.slice(0, 102) + " ..."
                : props.product.description}
            </Typography>
          </Box>
          <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
            {props.product.owner._id !== props.currentUserInfo._id ? (
              <Button
                size="large"
                variant="outlined"
                color="secondary"
                sx={{ textTransform: "none", marginRight: 2 }}
                onClick={onFavoriteClick}
              >
                {checkFavorites()}
              </Button>
            ) : null}

            <Button
              component={Link}
              to={`/products/${props.product._id}`}
              size="large"
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

const mapStateToProps = (state) => {
  return {
    userFavorites: state.auth.userInfo.favorites,
  };
};

export default connect(mapStateToProps, { favoriteProduct })(ProductItem);
