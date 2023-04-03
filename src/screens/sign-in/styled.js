import { Button, FormControl } from "@mui/material";

import { Alert as BaseAlert } from "../../containers/alert";
import { Container as BaseContainer } from "../../components/generic/container";
import { InputText } from "primereact/inputtext";
import styled from "styled-components";

export const Alert = styled(BaseAlert)`
  top: 0px !important;
  right: 3px !important;
`;

export const Container = styled(BaseContainer)`
  justify-content: center;
  align-items: center;
`;

export const Div = styled.div`
  padding: 16px;
  max-width: 568px;
`;

export const Label = styled.label`
  width: 50px;
  height: 75px;
  margin-top: 30px;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 123.5%;

  text-align: center;
  letter-spacing: 0.25px;

  color: #65676b;
`;

export const Input = styled(InputText)`
  width: 18rem;
`;

export const TextInput = styled.label`
  font-size: 1rem;
`;

export const StyledFormControl = styled(FormControl)`
  display: flex !important;
  margin-bottom: 16px !important;
  label {
    line-height: 0.8em !important;
    font-size: 0.875rem !important;
  }
  input {
    font-size: 0.875rem !important;
  }
`;

export const BlueLabel = styled(TextInput)`
  float: left;
  color: blue;
  margin-left: 0.5rem;
`;

export const SubmitButton = styled(Button)`
  width: 100%;
`;

export const InputTextField = ({ value, label }) => {
  return (
    <span className="p-float-label" style={{ marginTop: "30px" }}>
      <Input id="in" value={value} style={{ width: "18rem" }} />
      <label htmlFor="in" style={{ fontSize: "1rem" }}>
        {label}
      </label>
    </span>
  );
};
