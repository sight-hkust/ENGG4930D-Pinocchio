import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import { Suspense } from "react";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "./index.css";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Router from "./containers/RouteCollection";
import store from "./store";
import { Provider } from "react-redux";
import "./i18n";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans", "sans-serif"].join(","),
  },
});

var firebaseConfig = {
  apiKey: "AIzaSyDiNVv8_UBM0Egcbxqjaf0K51x-9J_sX0A",
  authDomain: "ust-sight-pinocchio.firebaseapp.com",
  projectId: "ust-sight-pinocchio",
  storageBucket: "ust-sight-pinocchio.appspot.com",
  messagingSenderId: "449896953766",
  appId: "1:449896953766:web:1f5374d846ffb070320167",
  measurementId: "G-NPZZZP04E6",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Suspense fallback='...is loading'>
          <Router />
        </Suspense>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
