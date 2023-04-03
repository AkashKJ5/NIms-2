import { Divider } from "@mui/material";
import { Container as baseContainer } from "../components/generic/container";
import styled from "styled-components";

export const Container = styled(baseContainer)`
  margin-top: 3.5rem;
`;

export const DividerLine = styled(Divider)`
  margin-bottom: 10px !important;
  border-color: rgba(258,258,258,0.3) !important;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;

export const Text = styled.label`
  display: block;
  margin: 8px 0;
`;