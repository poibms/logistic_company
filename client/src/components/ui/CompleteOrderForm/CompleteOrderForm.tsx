import { Paper } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { completeOrder } from "../../../store/orders";
import { DriverType, OrderType } from "../../../types/types";
import calculateShippingCost from "../../../utils/PriceCalculator";
import transformDate from "../../../utils/TransformData";
import InputField from "../../common/InputField/InputField";
import validatorConfig from "./ValidatorConfig";

type CompleteOrderPropsType = {
  order: OrderType;
  driver: DriverType;
};
const CompleteOrderForm: React.FC<CompleteOrderPropsType> = ({
  order,
  driver,
}) => {
  const initialData: any = {
    distance: order.distance,
    fuel: order.fuel,
  };

  const [fuelError, setFuelError] = React.useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data, errors, handleInputChange, validate } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const validateCompleteOrder = () => {
    if (data.fuel == 0) {
      setFuelError(true);
      return false;
    }
    return validate(data);
  };

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFuelError(false);
    if (validateCompleteOrder()) {
      const price = calculateShippingCost(
        +data.distance,
        order.cargo_type,
        +order.weight,
        +order.volume,
        +data.fuel
      );
      dispatch(
        completeOrder(
          {
            id: order.id,
            distance: +data.distance,
            price: Math.floor(price),
            fuel: +data.fuel,
            actual_delivery_date: transformDate(new Date(Date.now())),
          },
          () => navigate("/profile")
        )
      );
    }
  };

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Complete order</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="distance" label="Distance (km)" autoFocus />
          <InputField name="fuel" label="Fuel consumption" />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            // disabled={enterError ? true : false}
          >
            Complete Order
          </button>
        </Form>
        {fuelError && (
          <p className="form_error">Fuel consumption can't be 0 litrs/100km</p>
        )}
      </Paper>
    </div>
  );
};

export default CompleteOrderForm;
