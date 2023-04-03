import * as React from "react";

import { ArrowBack, Notifications } from "@mui/icons-material";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderTitle = styled.span`
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 14rem;
  display: inline-block;
`;

function ResponsiveAppBar({ title = "", isTitle = false }) {
  const navigate = useNavigate();
  return (
    <AppBar sx={{ backgroundColor: "#7166F9" }} position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Box>
            <Tooltip title="Go Back">
              {isTitle && title ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton alt="arrow0-back">
                    <ArrowBack
                      style={{ color: "#FFF" }}
                      onClick={() => {
                        navigate(-1);
                      }}
                    />
                  </IconButton>
                  <HeaderTitle>{title}</HeaderTitle>
                </div>
              ) : (
                <img height="28" alt="nemmadi" src="/logo.svg" />
              )}
            </Tooltip>
          </Box>
          {!isTitle && (
            <Box>
              <Tooltip title="Go Back">
                <IconButton alt="bell icon">
                  <Notifications sx={{color: "#FFFFFF"}} />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
