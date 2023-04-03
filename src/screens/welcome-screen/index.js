import { Container, Paragraph, Title } from "./styled";

import { ArrowRightAlt } from "@mui/icons-material";
import { Fab } from "@mui/material";
import { Logo as Image } from "../../components/generic/image";
import React from "react";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  React.useEffect(() => {
    if (auth.auth) {
      window.location.replace("/dashboard");
    }
  }, [auth]);

  return (
    <Container className="welcome-page">
      {!auth.auth ? (
        <>
          <Image src="/home.svg" alt="loading..." />
          <Title>Home Inspection</Title>
          <Paragraph>
            Get total peace of mind whilst taking over your home from the
            builder
          </Paragraph>
          <Fab
            size="medium"
            color="primary"
            aria-label="right"
            onClick={() => navigate("/login")}
          >
            <ArrowRightAlt />
          </Fab>
        </>
      ) : null}
    </Container>
  );
};

export default Welcome;
