import { Card } from "@mui/material";
import styled from "styled-components";

export const container = styled.div``;

/* -------------------------------------
-                                      |
- Container this is the base div.      |
- With responsive Mobile and web view. |
-                                      |
-------------------------------------- */
export const Container = styled.div`
  max-width: 768px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  text-align: center;
`;

/* -------------------------------------
-                                      |
-     Container With Card styled.      |
-                                      |
-------------------------------------- */
export const CardContainer = styled(Card)`
  text-align: left !important;
  border-radius: 16px !important;
  padding: 16px;
  background-color: #7166F9 !important;
  color: #FFFFFF !important;
  box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 20%) !important;
`;

export const DashCardContainer = styled(CardContainer)`
  background-color: #E5E2FF !important;
  color: #212121 !important;
`;
