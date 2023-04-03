import { Container as BaseContainer } from "../../components/generic/container";
import { Card } from "@mui/material";
import styled from "styled-components";

export const Container = styled(BaseContainer)`
  margin-top: 4rem;
`;

export const CardList = styled(Card)`
  margin-top: 1rem;
  text-align: left !important;
  box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 20%);
`;
