import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import BikeAppProvider from "./Context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BikeAppProvider>
    <App />
  </BikeAppProvider>
);
