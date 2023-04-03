import { ActionButton, Container, Image, Label } from "./styled";
import { ClearAll, Help } from "@mui/icons-material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@mui/material";
import { CardContainer } from "../../components/generic/container";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import React from "react";
import ResponsiveAppBar from "../../containers/tool-bar";
import { ScrollPanel } from "primereact/scrollpanel";
import styled from "styled-components";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Logo = styled(Image)`
  width: 8rem;
  height: 2rem;
`;

const Div = styled.div`
  margin: 1rem;
`;

const Accounts = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [userData, setUserData] = React.useState(null);

  const logout_user = () => {
    const isLoggedOut = logout();
    if (isLoggedOut) {
      localStorage.removeItem("tab");
      navigate("/login");
    }
  };

  React.useEffect(() => {
    if (!localStorage.getItem("login")) return;
    const logged_user = localStorage.getItem("login");
    setUserData(JSON.parse(logged_user).user);
  }, []);

  return (
    <>
      <Container>
        <ResponsiveAppBar isTitle title="Account" />
        <ScrollPanel className="unit-pannel">
          <CardContainer>
            <div
              style={{
                textAlign: "center",
                marginTop: ".8rem",
              }}
            >
              <PermIdentityIcon />
              <Label>{userData ? userData.username : "N/A"}</Label>
              <Button variant="outlined" style={{ borderRadius: "1.5rem" }}>
                {userData ? userData.role.name : "N/A"}
              </Button>

              <Div>
                <ActionButton
                  variant="contained"
                  startIcon={<PermIdentityIcon />}
                  endIcon={<ArrowForwardIosIcon />}
                  color="secondary"
                  style={{ width: "13rem" }}
                >
                  Edit Profile
                </ActionButton>
              </Div>

              <Div>
                <ActionButton
                  variant="contained"
                  startIcon={<ClearAll />}
                  endIcon={<ArrowForwardIosIcon />}
                  color="secondary"
                >
                  Free Up Space
                </ActionButton>
              </Div>

              <Div>
                <ActionButton
                  variant="contained"
                  startIcon={<Help />}
                  endIcon={<ArrowForwardIosIcon />}
                  color="secondary"
                  onClick={() => navigate('/help')}
                >
                  Help
                </ActionButton>
              </Div>

              <Div>
                <ActionButton
                  variant="contained"
                  startIcon={<LogoutIcon />}
                  endIcon={<ArrowForwardIosIcon />}
                  color="secondary"
                  onClick={() => logout_user()}
                >
                  Logout
                </ActionButton>
              </Div>

              <div style={{ marginTop: "2rem" }}>
                <Image src="/profile_logo.svg" alt="load" />
                <Label>Version 2.3.7</Label>
                <Logo src="/logo.svg" alt="load" />
                <Label>©2022 NEMMADI. ALL RIGHTS RESERVED</Label>
              </div>
            </div>
          </CardContainer>
        </ScrollPanel>
      </Container>
    </>
  );
};

export default Accounts;
