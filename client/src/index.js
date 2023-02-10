import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import {ThemeProvider, CssBaseline} from "@mui/material";
import {theme} from "./styles/theme";
import "./styles/index.scss";
import {App} from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <>
        <CssBaseline/>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </>
);
