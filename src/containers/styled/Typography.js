import styled from 'styled-components';

export const H1 = styled.h1``;

export const H2 = styled.h2``;

export const H3 = styled.h3`
  font-weight: ${(props) => props.theme.font.weights.light};
  margin: 10px 0;
`;

export const H4 = styled.h4`
  font-weight: ${(props) => props.theme.font.weights.medium};
  margin: 0;
`;

export const ReportHeader = styled.p`
  font-weight: ${(props) => props.theme.font.weights.medium};
  font-size: ${(props) => props.theme.font.sizes.l};
`;

export const H5 = styled.h5`
  font-weight: ${(props) => props.theme.font.weights.medium};
  margin: 10px 0;
`;
export const Span = styled.h5`
  font-weight: ${(props) => props.theme.font.weights.semi_bold};
  font-size: ${(props) => props.theme.font.sizes.standard};
  line-height: ${(props) => props.theme.font.sizes.standard};
  margin: 0px 0;
`;

export const SubHeading = styled.span`
  font-weight: ${(props) => props.theme.font.weights.regular};
  color: ${(props) => props.theme.colors.font_light};
  font-size: ${(props) => props.theme.font.sizes.xs};
  letter-spacing: 1px;
`;

export const Heading = styled.label`
  font-size: ${(props) => props.theme.font.sizes.xxxl};
`;

export const ErrorLabel = styled.label`
  color: ${(props) => props.theme.colors.error};
  font-size: ${(props) => props.theme.font.sizes.xs};
`;

export const StyledLabel = styled.label`
  color: ${(props) => props.theme.colors.black};
  font-weight: 600;
`;

export const SummaryLabel = styled(StyledLabel)`
  font-size: ${(props) => props.theme.font.sizes.s};
`;

export const StyledDesc = styled.label`
  color: rgba(0, 0, 0, 0.6);
`;

export const SummaryDesc = styled(StyledDesc)`
  font-size: ${(props) => props.theme.font.sizes.s};
`;
