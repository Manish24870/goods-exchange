import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Box, Typography, Container, Grid } from "@mui/material";

import UserList from "./UserList";
import ProductList from "./ProductList";
import Sidebar from "./Sidebar";
import Loading from "../loading/Loading";
import {
  adminGetAllUsers,
  adminDeleteUser,
  adminPromoteUser,
  adminDemoteUser,
  adminGetAllProducts,
  adminDeleteProduct,
} from "../../actions/adminActions";

const Admin = (props) => {
  // For Sidebar
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (e, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    props.adminGetAllUsers();
    props.adminGetAllProducts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let renderList;

  if (props.adminUsersLoading || props.adminProductsLoading) {
    renderList = <Loading />;
  } else if (selectedIndex === 0) {
    renderList = (
      <UserList
        adminUsers={props.adminUsers}
        adminDeleteUser={props.adminDeleteUser}
        adminPromoteUser={props.adminPromoteUser}
        adminDemoteUser={props.adminDemoteUser}
      />
    );
  } else if (selectedIndex === 1) {
    renderList = (
      <ProductList
        adminProducts={props.adminProducts}
        adminDeleteProduct={props.adminDeleteProduct}
      />
    );
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
    adminProducts: Object.values(state.admin.adminProducts),
    adminUsersLoading: state.admin.adminUsersLoading,
    adminProductsLoading: state.admin.adminProductsLoading,
  };
};

export default connect(mapStateToProps, {
  adminGetAllUsers,
  adminDeleteUser,
  adminPromoteUser,
  adminDemoteUser,
  adminGetAllProducts,
  adminDeleteProduct,
})(Admin);
