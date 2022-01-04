import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Button,
  Paper,
} from "@mui/material";
import { ArrowForwardIos, CompareArrowsOutlined } from "@mui/icons-material";

import { createNewExchange } from "../../actions/exchangeActions";

const InitiateItem = (props) => {
  const initiatorData = props.product.initiator.filter(
    (el) => el.initiatorId === props.loggedInUserId
  )[0];

  // When user cancels exchange on their initiates page
  const onExchangeCancel = () => {
    const exchangeData = {
      productWanted: props.product.productWanted._id,
    };
    props.createNewExchange(exchangeData);
  };

  // Check offer status as pending, accepted or rejected
  const checkOfferStatus = () => {
    if (initiatorData.offerStatus === "pending") {
      return (
        <React.Fragment>
          <CompareArrowsOutlined color="info" sx={{ fontSize: "40px" }} />
          <Button
            variant="outlined"
            color="info"
            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
          >
            Pending
          </Button>
        </React.Fragment>
      );
    } else if (initiatorData.offerStatus === "rejected") {
      return (
        <React.Fragment>
          <CompareArrowsOutlined color="secondary" sx={{ fontSize: "40px" }} />
          <Button
            variant="outlined"
            color="secondary"
            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
          >
            Rejected
          </Button>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CompareArrowsOutlined color="primary" sx={{ fontSize: "40px" }} />
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
          >
            Accepted
          </Button>
        </React.Fragment>
      );
    }
  };

  return (
    <Paper sx={{ marginBottom: 5 }} variant="outlined">
      <Box mt={2} ml={2} mb={2} mr={2}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.12em", textAlign: "center" }}
            >
              Given
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="120"
                image={"https://picsum.photos/400/400"}
                alt={initiatorData.initiatorProduct.name}
              />

              <CardContent>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "1.12em" }}>
                    {initiatorData.initiatorProduct.name}
                  </Typography>
                </Box>
                <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={props.loggedInUserData.username}
                    src={"product.posterDetails.photo"}
                    sx={{ bgcolor: "#2196f3" }}
                  />
                  <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ fontSize: "0.95em" }}>
                      {props.loggedInUserData.username}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ opacity: "90%", fontSize: "0.81em" }}
                    >
                      {moment(initiatorData.initiatorProduct.postedAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} sx={{ minHeight: "40px" }}>
                  <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                    {initiatorData.initiatorProduct.description.length > 55
                      ? initiatorData.initiatorProduct.description.slice(
                          0,
                          56
                        ) + " ..."
                      : initiatorData.initiatorProduct.description}
                  </Typography>
                </Box>
                <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    component={Link}
                    to={`/products/${initiatorData.initiatorProduct._id}`}
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                  >
                    Details
                    <ArrowForwardIos sx={{ fontSize: "1em", marginLeft: 1 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Button
              variant="default"
              color="secondary"
              size="small"
              sx={{
                marginTop: 2,
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                marginBottom: 9,
              }}
            >
              <Typography variant="p" sx={{ opacity: "94%" }}>
                Initiated At:
              </Typography>
              <Typography variant="p">
                {moment(initiatorData.initiatedAt).format(
                  "MMM Do YYYY, h:mm a"
                )}
              </Typography>
            </Button>
            {/* <CompareArrowsOutlined color="secondary" sx={{ fontSize: "40px" }} />
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
                        >
                            Pending
                        </Button> */}
            {checkOfferStatus()}
            <Button
              onClick={onExchangeCancel}
              variant="default"
              color="secondary"
              size="small"
              sx={{
                marginTop: 9,
                textTransform: "none",
                color: "#6325A9",
              }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Typography
              variant="h6"
              sx={{ fontSize: "1.12em", textAlign: "center" }}
            >
              Wanted
            </Typography>
            <Card>
              <CardMedia
                component="img"
                height="120"
                image={"https://picsum.photos/400/400"}
                alt={props.product.productWanted.name}
              />

              <CardContent>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "1.12em" }}>
                    {props.product.productWanted.name}
                  </Typography>
                </Box>
                <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={props.product.owner.username}
                    src={"product.posterDetails.photo"}
                    sx={{ bgcolor: "#2196f3" }}
                  />
                  <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ fontSize: "0.95em" }}>
                      {props.product.owner.username}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ opacity: "90%", fontSize: "0.81em" }}
                    >
                      {moment(props.product.productWanted.postedAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} sx={{ minHeight: "40px" }}>
                  <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                    {props.product.productWanted.description.length > 55
                      ? props.product.productWanted.description.slice(0, 56) +
                        " ..."
                      : props.product.productWanted.description}
                  </Typography>
                </Box>
                <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    component={Link}
                    to={`/products/${props.product.productWanted._id}`}
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                  >
                    Details
                    <ArrowForwardIos sx={{ fontSize: "1em", marginLeft: 1 }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default connect(null, { createNewExchange })(InitiateItem);
