import { Container as BaseContainer } from "../../components/generic/container";
import styled from "styled-components";

export const CenteredContainer = styled.div`
  width: 100vw;
  height: 100vh;
  text-align: center;
`;

export const Container = styled(BaseContainer)`
  justify-content: center;
  align-items: center;
`;
export const Title = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: 400;
`;

export const Paragraph = styled.p`
  margin-top: 0;
  font-weight: 200;
  font-size: 14px;
  color: #65676b;
`;
