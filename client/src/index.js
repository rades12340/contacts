import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import axios from "axios";
import AuthState from "./context/auth/AuthState";

import App from "./App";

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.headers.common["x-auth-token"] = AUTH_TOKEN;

ReactDOM.render(
  <AuthState>
    <App />
  </AuthState>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
