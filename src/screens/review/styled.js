import { Divider, Button as MuiButton } from "@mui/material";

import { Container as baseContainer } from "../../components/generic/container";
import styled from "styled-components";

export const Container = styled(baseContainer)`
  margin-top: 4rem;
`;

export const DividerLine = styled(Divider)`
  margin-bottom: 10px !important;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  width: 50%;
`;

export const Text = styled.label`
  display: block;
  color: #1976d2;
  margin: 10px 0;
  width: 50%;
`;

export const DivContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 2rem;
`;

export const Button = styled(MuiButton)`
  margin-top: 1.5rem;
  width: 46%;
`;
