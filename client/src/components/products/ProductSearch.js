import React from "react";
import { Box, Grid, TextField } from "@mui/material";

// Search bar component
const ProductSearch = (props) => {
  return (
    <Box>
      <Box component="form">
        <Grid
          container
          sx={{ display: "flex", justifyContent: "center", alignItems: "end" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant="standard"
              label="Search For Something"
              name="searchText"
              value={props.searchText}
              onChange={props.onSearchTextChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductSearch;
