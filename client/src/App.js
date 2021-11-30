import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/materialUI/theme";

import Layout from "./components/layout/Layout";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
