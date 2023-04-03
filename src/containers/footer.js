import * as React from "react";

import {
  Home,
  Person,
  SearchSharp,
  Settings,
  VideoCallSharp,
} from "@mui/icons-material";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import styled from "styled-components";
import { tabHandling } from "../controller/handle-tabs";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled(Container)`
  position: fixed;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  z-index: 1;
  bottom: 0px;
  padding-left: 10px;
  max-width: 100vw !important;
  padding: 0px !important;
`;

export default function Footer() {
  const auth = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [role, setRole] = React.useState("");

  function ChangingTab(value) {
    const tab = tabHandling(value);
    setValue(tab.id);
    auth.tabHandling(value)
    navigate(tab.name.route);
  }

  React.useEffect(() => {
    if (auth.auth) {
      setRole(auth.auth.user.role.name);
    }
    if (localStorage.getItem("tab")) {
      setValue(JSON.parse(localStorage.getItem("tab")).id);
    }
  }, [auth.auth]);

  return (
    <CenteredContainer>
      <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => ChangingTab(newValue)}
        >
          <BottomNavigationAction label="Home" icon={<Home />} />
          {role === "Inspector" && (
            <BottomNavigationAction label="Snag" icon={<SearchSharp />} />
          )}
          {role === "Inspector" && (
            <BottomNavigationAction label="Desnag" icon={<VideoCallSharp />} />
          )}
          {role === "Engineer" && (
            <BottomNavigationAction label="Fix" icon={<Settings />} />
          )}
          <BottomNavigationAction label="Account" icon={<Person />} />
        </BottomNavigation>
      </Box>
    </CenteredContainer>
  );
}
