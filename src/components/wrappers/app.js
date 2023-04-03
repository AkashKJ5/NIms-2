import { AuthProvider } from "../../context/auth";
import { DbProvider } from "../../context/database";
import { OnlineStatusProvider } from "../../context/online-checker";
import React from "react";
import styled from "styled-components";

/**
 * AppWrapper component.
 *
 * Wraps the children with:
 *   - the DbProvider component to handle database connection
 *
 * @component
 * @example
 *   <AppWrapper>
 *     <App />
 *   </AppWrapper>
 */

const BasicWrapper = styled.div`
  font-family: "Roboto", helvetica, arial, sans-serif;
  font-size: 24px;
  background-color: #F2F2F2;
  margin: 0;
`;

const AppWrapper = ({ children }) => (
  <OnlineStatusProvider>
    <BasicWrapper>
      <DbProvider>
        <AuthProvider>{children}</AuthProvider>
      </DbProvider>
    </BasicWrapper>
  </OnlineStatusProvider>
);

export default AppWrapper;
