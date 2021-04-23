import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap-override.scss";
import reportWebVitals from "./reportWebVitals";
import UserSignupPage from "./pages/UserSignupPage";

ReactDOM.render(
  <React.StrictMode>
    <UserSignupPage />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
