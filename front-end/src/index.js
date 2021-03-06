import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ProvideAuth } from "./firebase/firebaseProvider";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const myTheme = createTheme({
  breakpoints: {
    keys: ["xs", "msm", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      msm: 600,
      sm: 668,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: "DM Sans",
    fontSize: "16px",
    fontWeightRegular: "400",
  },
  palette: {
    primary: {
      light: "#254E58",
      main: "#254E58",
      dark: "#112D32",
      // contrastText: "#fff",
    },
    secondary: {
      light: "#4F4A41",
      main: "#4F4A41",
      dark: "#6E6658",
      contrastText: "#000",
    },
    // primary: {
    //   main: "#7c2a22",
    //   light: "#7c2a22",
    //   dark: "#9db9c4",
    // },
  },
});

ReactDOM.render(
  <ProvideAuth>
    <BrowserRouter>
      <React.StrictMode>
        <SnackbarProvider maxSnack={3}>
          <ThemeProvider theme={myTheme}>
            {" "}
            <App />
          </ThemeProvider>
        </SnackbarProvider>
      </React.StrictMode>
    </BrowserRouter>
  </ProvideAuth>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
