import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Container, Grid } from "@mui/material";

import UserList from "./UserList";
import Sidebar from "./Sidebar";
import Loading from "../loading/Loading";
import { getAllUsers } from "../../actions/adminActions";

const Admin = (props) => {
  // For Sidebar
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    props.getAllUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let renderList;

  if (props.adminUsersLoading) {
    renderList = <Loading />;
  } else if (selectedIndex === 0) {
    renderList = <UserList adminUsers={props.adminUsers} />;
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

const mapStateToProps = (state) => {
  return {
    adminUsers: Object.values(state.admin.adminUsers),
    adminUsersLoading: state.admin.adminUsersLoading,
  };
};

export default connect(mapStateToProps, { getAllUsers })(Admin);
