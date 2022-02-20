import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid, Box, Typography, Container } from "@mui/material";

import FavoriteItem from "./FavoriteItem";
import Loading from "../loading/Loading";
import { getMyFavorites } from "../../actions/exchangeActions";

const Favorites = (props) => {
  useEffect(() => {
    props.getMyFavorites();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let renderFavorites;

  if (props.myFavoritesLoading) {
    renderFavorites = <Loading />;
  } else if (props.myFavorites.length === 0) {
    renderFavorites = (
      <Grid item xs={4}>
        <Typography mt={4} mb={3} variant="p" sx={{ fontWeight: 400 }}>
          Your favorites are empty
        </Typography>
      </Grid>
    );
  } else {
    renderFavorites = props.myFavorites.map((favorite) => {
      return (
        <Grid key={favorite._id} item xs={12} sm={6} md={4}>
          <FavoriteItem product={favorite.product} owner={favorite.owner} />
        </Grid>
      );
    });
  }
  return (
    <Box mt={11}>
      <Container maxWidth="lg">
        <Typography mt={3} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
          My Favorites
        </Typography>
        <Grid container spacing={5} mb={6}>
          {renderFavorites}
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    myFavoritesLoading: state.exchange.myFavoritesLoading,
    myFavorites: state.exchange.myFavorites,
  };
};

export default connect(mapStateToProps, { getMyFavorites })(Favorites);
