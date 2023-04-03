import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import React from "react";

/*
________________________________________________________________
-                                                               |
-   This is generic component for single select dropdown        |
-@Props (*data) dropdown data                                   |
-@Props (*value) selected data from the dropdown                |
-@Props (*handleOption) onchange fun                            |
-@Props (*title) title of the dropdown                          |
-@Props (*isAllOption) for disable the all option               |
-                                                               |
________________________________________________________________|
*/

export const SingleSelectOptions = ({
  data,
  value,
  handleOption,
  title = "status",
  isAllOption = true,
}) => {
  return (
    <FormControl style={{ width: "96%", margin: "auto" }}>
      <InputLabel id="demo-simple-select-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="status"
        onChange={(e) => {
          handleOption(e.target.value);
        }}
      >
        {isAllOption && <MenuItem value={""}>ALL</MenuItem>}

        {data.map((entry, index) => {
          return (
            <MenuItem key={index} value={entry.id}>
              {entry.name.toUpperCase()}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
