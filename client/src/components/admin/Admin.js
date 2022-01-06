import React from "react";
import { connect } from "react-redux";
import { Box, Typography, Container, Grid } from "@mui/material";

import UserList from "./UserList";
import Sidebar from "./Sidebar";

const Admin = (props) => {
  // For Sidebar
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  let renderList;

  if (selectedIndex === 1) {
    renderList = <UserList />;
  }

  return (
    <Box mt={11}>
      <Container maxWidth="lg">
        <Typography mt={3} mb={3} variant="h5" sx={{ fontWeight: 500 }}>
          Admin Panel
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <Sidebar
              selectedIndex={selectedIndex}
              handleListItemClick={handleListItemClick}
            />
          </Grid>
          <Grid item xs={9}>
            {renderList}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Admin;
