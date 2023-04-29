import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import * as React from "react";

type SelectInputProps = {
  label: string;
  onChange: any;
  value: any;
  items: any[];
  name: string;
  error?: any;
};

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  onChange,
  value,
  items,
  name,
  error
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
      <FormControl fullWidth error={!!error}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="truck"
          onChange={onChange}
        >
          {selectMenuItems}
        </Select>
      </FormControl>
    </div>
  );
};

export default React.memo(SelectInput);
