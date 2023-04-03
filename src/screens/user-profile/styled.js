import { Container as BaseContainer } from "../../components/generic/container";
import { Button } from "@mui/material";
import styled from "styled-components";

export const Container = styled(BaseContainer)`
  margin-top: 4rem;
`;
export const Card = styled.div`
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  width: 65%;
  margin: auto;
  margin-top: 1rem;
  border-radius: 3px;
  background: #f5f5f5;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 0.5rem;
`;

export const ActionButton = styled(Button)`
  width: 13rem;
  background-color: #f5f5f5 !important;
  color: rgba(0, 0, 0, 0.87) !important;
  justify-content: space-between !important;
`;
export const Image = styled.img``;
