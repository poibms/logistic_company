import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";

type SelectInputProps = {
  label: string;
  handleChange: any;
  value: any;
  items: any[];
  name: string;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  handleChange,
  value,
  items,
  name,
}) => {
  const genMenuItem = () => {
    return items.map((item) => (
      <MenuItem key={item.id} value={item.name}>
        {item.name}
      </MenuItem>
    ));
  };

  const selectMenuItems = genMenuItem();
  return (
    <div className="flex flex_column select_menu">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="truck"
          onChange={handleChange}
        >
          {selectMenuItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default React.memo(SelectInput);
