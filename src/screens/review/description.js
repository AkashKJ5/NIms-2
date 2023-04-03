import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";

import { Container } from "./styled";
import React from "react";
import { SingleSelectOptions } from "../../containers/select-option/single-select";

const RoomTypeDescription = ({
    description,
    handleChangedValue,
    optionValue,
  }) => {
    const [option, setOption] = React.useState("write");
  
    return (
      <Container style={{marginTop: '0px',height:'auto'}}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={option}
            name="radio-buttons-group"
            onChange={(e) => {
              setOption(e.target.value);
            }}
          >
            <FormControlLabel
              value="write"
              control={<Radio />}
              label="Write Description"
            />
            <FormControlLabel
              value="select"
              control={<Radio />}
              label="Select Description"
            />
          </RadioGroup>
          {option === "select" ? (
            <div style={{ marginTop: "1rem" }}>
              <SingleSelectOptions
                data={description}
                value={optionValue}
                handleOption={(value) => {
                  handleChangedValue(value);
                }}
                isAllOption={false}
                title="Descriptions"
              />
            </div>
          ) : (
            <div style={{ marginTop: "1rem" }}>
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                style={{ width: "96%" }}
              />
            </div>
          )}
        </FormControl>
      </Container>
    );
  };
  
  export default RoomTypeDescription;
  