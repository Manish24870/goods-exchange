import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(PrivateRoute);
