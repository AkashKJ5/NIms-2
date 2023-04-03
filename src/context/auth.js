import {
  startSynchronization,
  stopSynchronization,
} from "../rxdb/replications";

import React from "react";
import { SyncWithFirebase } from "../webkit-file-storage/firebase-replications";
import { loginGraphQL } from "../controller/auth";
import { useDatabase } from "./database";

/**
 * Authorization context
 */
const AuthContext = React.createContext();

/**
 * Authorization hook
 *
 * @returns authorization objects: user, login, logout
 */
export const useAuth = () => React.useContext(AuthContext);

/**
 * Authorization Provider component
 *
 * Handles authentication and authorization for all nested children.
 * Provides:
 * - auth object
 * - login method
 * - logout method
 */
export const AuthProvider = ({ children }) => {
  const database = useDatabase();
  const [online, setOnline] = React.useState(navigator.onLine);
  const [auth, setAuth] = React.useState(null);
  const [replications, setReplications] = React.useState([]);
  const [tabAuth, setTabAuth] = React.useState(null);

  /**
   * Log in:
   * - Uses GraphQL endpoint with provided credentials
   * - Saves in RxDB auth data: user, token and refresh token
   */
  const login = React.useCallback(async (data) => {
    // here the query will come for login
    const user_data = await loginGraphQL(data.username, data.password);
    localStorage.setItem("login", JSON.stringify(user_data));
    return setAuth(JSON.parse(localStorage.getItem("login")));
  }, []);

  const logout = React.useCallback(async () => {
    localStorage.removeItem("login");
    setAuth(null);
    return true;
  }, []);

  const tabHandling = React.useCallback(async (value) => {
    setTabAuth(value);
    return value;
  }, []);

  /**
   * Start synchronization with firebase and webkit-file-system
   */
  React.useEffect(() => {
    if (localStorage.getItem("login")) {
      setAuth(JSON.parse(localStorage.getItem("login")));
    }

    // start synchronization when there is login data
    setInterval(() => {
      if (!online) return;
      SyncWithFirebase("Nemmadiv2");
    }, 100000);
    setOnline(navigator.onLine);
  }, [database, online]);

  const authContext = React.useMemo(
    () => ({ login, logout, tabHandling }),
    [login, logout, tabHandling]
  );

  /**
   * Start synchronization with a new JWT value
   */
  React.useEffect(() => {
    // start synchronization when there is login data
    const repl = startSynchronization(database);
    setReplications(repl);

    return () => {
      console.log('inside start');
      stopSynchronization(repl);
      setReplications([]);
    };
  }, [database, auth]);

  /**
   * Stop synchronization if no token
   */
  React.useEffect(() => {
    // stop synchronization when there is no login data
    if (replications.length > 0) {
      console.log('inside stop');
      stopSynchronization(replications);
      setReplications([]);
    }
  }, [replications]);

  return (
    <AuthContext.Provider value={{ auth, tabAuth, ...authContext }}>
      {children}
      <span data-testid="app-auth-loaded" />
    </AuthContext.Provider>
  );
};
