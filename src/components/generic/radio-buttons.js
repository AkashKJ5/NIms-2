import * as React from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function CheckButtons({ options, value, handleToggle }) {
  const [alignment, setAlignment] = React.useState(value);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    handleToggle(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {options.map((term) => {
        return (
          <ToggleButton value={term.id} key={term.id}>
            <img
              width="75"
              height="50"
              src={`/status/${term.name}.svg`}
              alt="load"
            />
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}

export function PriorityTab({ options, value, handleToggle }) {
  const [alignment, setAlignment] = React.useState(value);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    handleToggle(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      {options.map((term) => {
        return (
          <ToggleButton value={term.id} key={term.id}>
            {term.name}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
