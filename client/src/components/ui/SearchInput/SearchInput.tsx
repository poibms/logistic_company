import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../../store/orders";
import { getAllDrivers } from "../../../store/drivers";
import { getAllTrucks } from "../../../store/trucks";

export default function SearchInput() {
  const [inputValue, setInputValue] = React.useState("");
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  const autoCompleteOption = [...orders, ...drivers, ...trucks];

  const setinputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <Stack spacing={2} sx={{ minWidth: '40vw' }}>
      <Autocomplete
        freeSolo
        inputValue={inputValue}
        onInputChange={setinputValue}
        id="combo-box-demo"
        options={autoCompleteOption.map((option) => option.name)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
        open={inputValue.length > 1}
      />
    </Stack>
  );
}
