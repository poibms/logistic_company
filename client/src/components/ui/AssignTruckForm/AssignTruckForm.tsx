import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { getDriverErrors, setDriverToTruck } from "../../../store/drivers";
import { getAllTrucks } from "../../../store/trucks";

type AssihnTruckPropsType = {
  dataId: string;
  handleClose: any;
};

const AssignTruckForm: React.FC<AssihnTruckPropsType> = ({
  dataId,
  handleClose,
}) => {
  const [truck, setTruck] = React.useState("");
  const [enterError, setEnterError] = React.useState("");
  const trucks = useSelector(getAllTrucks());
  const driverError = useSelector(getDriverErrors());

  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setTruck(event.target.value);
  };

  const genTruckMenuItems = () => {
    const truckWithoutDriver = trucks.filter((item) => item.driverId === null);
    return truckWithoutDriver.map((truck) => (
      <MenuItem key={truck.id} value={truck.id}>
        <>
          <img src={`http://localhost:3007/${truck.photo}`} alt="truck img" />
          {truck.name} {truck.model}
        </>
      </MenuItem>
    ));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("handleSubmit");
    if (truck !== "") {
      console.log("true");
      dispatch(
        setDriverToTruck(
          { driverId: dataId, truckId: truck },
          () => handleClose()
        )
      );
    } else {
      setEnterError("Choose the truck");
    }
  };

  const TruckMenuItem = genTruckMenuItems();

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Assign Truck to Driver</h2>
        <Form data={{ truck: truck }}>
          {TruckMenuItem.length > 0 ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Truck</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={truck}
                label="truck"
                onChange={handleChange}
              >
                {TruckMenuItem}
              </Select>
            </FormControl>
          ) : (
            <p className="flex alig-center" style={{ color: "red" }}>
              There is no free drivers right now. Please try it later
            </p>
          )}

          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Assign
          </button>
        </Form>
        {enterError && <p className="form_error">{enterError}</p>}
        {driverError && <p className="form_error">{driverError}</p>}
      </Paper>
    </div>
  );
};

export default AssignTruckForm;
