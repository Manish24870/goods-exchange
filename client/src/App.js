import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import theme from "./utils/materialUI/theme";
import Layout from "./components/layout/Layout";
import store from "./store";
import "./App.css";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <ToastContainer
                    autoClose={2000}
                    closeOnClick={true}
                    limit={1}
                    style={{ marginTop: 75 }}
                    pauseOnFocusLoss={false}
                />
                <ThemeProvider theme={theme}>
                    <Layout />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
