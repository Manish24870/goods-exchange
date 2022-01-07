import React from "react";
import jwt_decode from "jwt-decode";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "../auth/PrivateRoute";
// import AdminRoute from "../auth/AdminRoute";
// import HomePage from "../homepage/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Navbar from "../navigation/Navbar";
import NewProduct from "../newProduct/NewProduct";
import Products from "../products/Products";
import Product from "../product/Product";
import Profile from "../profile/Profile";
import EditProfile from "../profile/editProfile/EditProfile";
import Favorites from "../favorites/Favorites";
import Initiates from "../initiates/Initiates";
import Offers from "../offers/Offers";
import Admin from "../admin/Admin";
import setAuthToken from "../../utils/auth/setAuthToken";
import { setCurrentUser, populateUserInfo } from "../../actions/authActions";
import store from "../../store";

// Check login state of the user
if (localStorage.jwt) {
  const token = localStorage.jwt;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  store.dispatch(populateUserInfo(decoded.id));
}

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/products/new"
          element={
            <PrivateRoute>
              <NewProduct />
            </PrivateRoute>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<Product />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/initiates"
          element={
            <PrivateRoute>
              <Initiates />
            </PrivateRoute>
          }
        />
        <Route
          path="/offers"
          element={
            <PrivateRoute>
              <Offers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Layout;
