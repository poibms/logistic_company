import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../../store/orders";
import { getAllDrivers } from "../../../store/drivers";
import { getAllTrucks } from "../../../store/trucks";
import { Box } from "@mui/material";

export default function SearchInput() {
  const [inputValue, setInputValue] = React.useState("");
  const orders = useSelector(getAllOrders());
  const drivers = useSelector(getAllDrivers());
  const trucks = useSelector(getAllTrucks());

  const autoCompleteOption = [...orders, ...drivers, ...trucks];

  const setinputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  const searchRes = (event:React.SyntheticEvent, value:any) => {
    console.log(value)
  }


  return (
    <Stack spacing={2} sx={{ minWidth: '40vw' }}>
      <Autocomplete
        // freeSolo
        autoComplete={inputValue.length >= 1 ? true : false}
        onInputChange={setinputValue}
        id="free-solo-demo"
        // freeSolo
        getOptionLabel={(option) => option.name}
        options={autoCompleteOption}
        onChange={searchRes}
        style={{ width: 300 }}
        renderOption={(props, option) => (
          <Box component="li" {...props} key={option.id}>
            {option.name}
          </Box>
        )}
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
      />
    </Stack>
  );
}
