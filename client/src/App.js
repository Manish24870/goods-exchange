import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import theme from "./utils/materialUI/theme";

import Layout from "./components/layout/Layout";
import store from "./store";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <Layout />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
