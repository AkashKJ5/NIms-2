import { Container as baseContainer } from "../../components/generic/container.js";
import styled from "styled-components";

export const Container = styled(baseContainer)`
  margin-top: 4rem;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
`;

export const Text = styled.label`
  display: block;
  color: #1976d2;
  margin: 10px 0;
`;
