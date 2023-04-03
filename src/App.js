/*
-
- This is main app file
- AppRoutes is component having all the routes
-
*/

import "./App.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import AppRoutes from "./components/routes";
import AppWrapper from "./components/wrappers/app";
import React from "react";
import { Theme } from './containers/styled/Theme';
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <AppWrapper>
      <ThemeProvider theme={Theme}>
      <AppRoutes />
      </ThemeProvider>
    </AppWrapper>
  );
}

export default App;
