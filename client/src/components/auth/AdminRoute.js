import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const AdminRoute = ({ isAuthenticated, children, role }) => {
  return isAuthenticated && role === "admin" ? (
    children
  ) : (
    <Navigate to="/auth/login" />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    role: state.auth.userInfo.role,
  };
};

export default connect(mapStateToProps)(AdminRoute);
