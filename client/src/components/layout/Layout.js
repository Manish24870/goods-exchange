import React from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route } from "react-router-dom";

import HomePage from "../homepage/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Navbar from "../navigation/Navbar";
import setAuthToken from "../../utils/auth/setAuthToken";
import { setCurrentUser } from "../../actions/authActions";
import store from "../../store";

// Check login state of the user
if (localStorage.jwt) {
    const token = localStorage.jwt;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
}

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default Layout;
