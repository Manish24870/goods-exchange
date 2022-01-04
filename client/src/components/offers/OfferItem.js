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

import {
  createNewExchange,
  rejectOffer,
  acceptOffer,
} from "../../actions/exchangeActions";

const OfferItem = (props) => {
  const onOfferAccept = () => {
    const exchangeData = {
      exchangeId: props.exchangeId,
      initiatorItemId: props.initiatorData._id,
    };
    props.acceptOffer(exchangeData);
  };

  const onOfferReject = () => {
    const exchangeData = {
      exchangeId: props.exchangeId,
      initiatorItemId: props.initiatorData._id,
    };
    props.rejectOffer(exchangeData);
  };

  const checkOfferStatus = () => {
    if (props.initiatorData.offerStatus === "accepted") {
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
    } else {
      return (
        <React.Fragment>
          <CompareArrowsOutlined color="primary" sx={{ fontSize: "40px" }} />
          <Button
            onClick={onOfferAccept}
            variant="outlined"
            color="primary"
            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
          >
            Accept
          </Button>
          <Button
            onClick={onOfferReject}
            variant="outlined"
            color="secondary"
            sx={{ width: 150, height: 50, fontSize: "1.05em", marginTop: 2 }}
          >
            Reject
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
                alt={props.givenProduct.name}
              />

              <CardContent>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "1.12em" }}>
                    {props.givenProduct.name}
                  </Typography>
                </Box>
                <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={props.initiatorData.initiatorId.username}
                    src={"product.posterDetails.photo"}
                    sx={{ bgcolor: "#2196f3" }}
                  />
                  <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ fontSize: "0.95em" }}>
                      {props.initiatorData.initiatorId.username}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ opacity: "90%", fontSize: "0.81em" }}
                    >
                      {moment(props.givenProduct.postedAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} sx={{ minHeight: "40px" }}>
                  <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                    {props.givenProduct.description.length > 55
                      ? props.givenProduct.description.slice(0, 56) + " ..."
                      : props.givenProduct.description}
                  </Typography>
                </Box>
                <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    component={Link}
                    to={`/products/${props.givenProduct._id}`}
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
              sx={{
                marginTop: 2,
                textTransform: "none",
                display: "flex",
                flexDirection: "column",
                marginBottom: 0,
              }}
            >
              <Typography variant="p" sx={{ opacity: "94%" }}>
                Initiated At:
              </Typography>
              <Typography variant="p">
                {moment(props.initiatorData.initiatedAt).format(
                  "MMM Do YYYY, h:mm a"
                )}
              </Typography>
            </Button>

            {props.initiatorData.acceptedAt ? (
              <Button
                variant="default"
                color="secondary"
                sx={{
                  marginTop: 2,
                  textTransform: "none",
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: 6,
                }}
              >
                <Typography variant="p" sx={{ opacity: "94%" }}>
                  Exchanged At:
                </Typography>
                <Typography variant="p">
                  {moment(props.initiatorData.acceptedAt).format(
                    "MMM Do YYYY, h:mm a"
                  )}
                </Typography>
              </Button>
            ) : null}
            {checkOfferStatus()}
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
                alt={props.wantedProduct.name}
              />

              <CardContent>
                <Box>
                  <Typography variant="h6" sx={{ fontSize: "1.12em" }}>
                    {props.wantedProduct.name}
                  </Typography>
                </Box>
                <Box mt={1} sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={props.ownerData.username}
                    src={"product.posterDetails.photo"}
                    sx={{ bgcolor: "#2196f3" }}
                  />
                  <Box ml={2} sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="p" sx={{ fontSize: "0.95em" }}>
                      {props.ownerData.username}
                    </Typography>
                    <Typography
                      variant="p"
                      sx={{ opacity: "90%", fontSize: "0.81em" }}
                    >
                      {moment(props.wantedProduct.postedAt).format(
                        "MMM Do YYYY, h:mm a"
                      )}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={3} sx={{ minHeight: "40px" }}>
                  <Typography variant="p" sx={{ fontSize: "0.9em" }}>
                    {props.wantedProduct.description.length > 55
                      ? props.wantedProduct.description.slice(0, 56) + " ..."
                      : props.wantedProduct.description}
                  </Typography>
                </Box>
                <Box mt={3} sx={{ display: "flex", justifyContent: "end" }}>
                  <Button
                    component={Link}
                    to={`/products/${props.wantedProduct._id}`}
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

export default connect(null, { createNewExchange, rejectOffer, acceptOffer })(
  OfferItem
);
