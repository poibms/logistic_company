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
import { Form } from "../../../hooks/useForm";
import { getAllDrivers } from "../../../store/drivers";
import { getOrdersErrors, setOrderToDriver } from "../../../store/orders";
import { OrderType } from "../../../types/types";

type AssihnDriverPropsType = {
  dataId: string;
  handleClose: any;
  data: OrderType,
};

const AssignDriverForm: React.FC<AssihnDriverPropsType> = ({
  dataId,
  handleClose,
  data
}) => {
  const [driver, setDriver] = React.useState("");
  const [enterError, setEnterError] = React.useState("");
  const drivers = useSelector(getAllDrivers());
  const orderError = useSelector(getOrdersErrors());

  console.log(drivers);

  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setDriver(event.target.value);
  };

  const genDriverMenuItems = () => {
    const suitableDrivers = drivers.filter(driver => driver.truckId && driver.orders.filter((order) => order.status !== 'in_progress')  && driver.truckId.truck_type === data.cargo_type && data.volume <= driver.truckId.trailer_volume && data.weight <= driver.truckId.loadCapacity)

    return suitableDrivers.map((driver) => (
      <MenuItem key={driver.id} value={driver.id}>
        <>
          <img src={`http://localhost:3007/${driver.photo}`} alt="truck img" />
          {driver.name} {driver.surname}
        </>
      </MenuItem>
    ));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (driver !== "") {
      dispatch(
        setOrderToDriver({ orderId: dataId, driverId: driver }, () =>
          handleClose()
        )
      );
    } else {
      setEnterError("Choose the truck");
    }
  };

  const DriverMenuItem = genDriverMenuItems();

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Choose the driver</h2>
        <Form data={{ driver: driver }}>
          {DriverMenuItem.length > 0 ? (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Driver</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={driver}
                label="truck"
                onChange={handleChange}
              >
                {DriverMenuItem}
              </Select>
            </FormControl>
          ) : (
            <p className="flex alig-center" style={{'color': 'red'}}>
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
        {orderError && <p className="form_error">{orderError}</p>}
      </Paper>
    </div>
  );
};

export default AssignDriverForm;
