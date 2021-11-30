import React from "react";
import { Routes, Route } from "react-router-dom";

import Register from "../auth/Register";
import Login from "../auth/Login";
import Navbar from "../navigation/Navbar";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/login" element={<Login />} />
            </Routes>
        </div>
    );
};

export default Layout;
