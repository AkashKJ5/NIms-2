import "./index.css";
import "primeicons/primeicons.css";

import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { expose } from "./utils/environment";
import reportWebVitals from "./reportWebVitals";
import serviceWorker from "./swDev";

expose();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker();
