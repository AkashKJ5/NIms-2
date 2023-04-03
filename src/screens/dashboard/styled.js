import { ScrollPanel } from "primereact/scrollpanel";
import { Container as baseContainer } from "../../components/generic/container.js";
import styled from "styled-components";

export const Image = styled.img`
  width: 100%;
  height: inherit;
`;

export const Container = styled(baseContainer)`
  margin-top: 4rem;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background-color: #95A1FE;
  box-shadow: rgba(0,0,0,0.19) 0px 10px 20px, rgba(0,0,0,0.23) 0px 1px 4px;
`;

export const StyledScrollPanel = styled(ScrollPanel)`
  margin-top: 3.5rem;
`;