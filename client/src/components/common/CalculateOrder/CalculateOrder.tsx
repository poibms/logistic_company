import { FormControl, FormHelperText } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { Form, useForm } from "../../../hooks/useForm";
import calculateDistance from "../../../utils/DistanceCalculator";
import calculateShippingCost from "../../../utils/PriceCalculator";
import {
  cargoTypeValue,
  FormState,
} from "../../ui/CreateOrderForm/CreateOrder";
import SelectInput from "../../ui/SelectInput/SelectInput";
import InputField from "../InputField/InputField";
import validatorConfig from "./ValidatorConfig";

type TypeCalculatorProps = {
  cities: any[];
};

const initialData: any = {
  weight: "",
  volume: "",
};

const CalculateOrder: React.FC<TypeCalculatorProps> = ({ cities }) => {
  const [formState, setFormState] = React.useState<FormState>({
    to: "",
    from: "",
    cargo_type: "",
  });
  const [fromErrors, setFromErrors] = React.useState("");
  const [toErrors, setToErrors] = React.useState("");
  const [cargoTypeErrors, setCargoTypeErrors] = React.useState("");
  const [distance, setDistance] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [distanceError, setDistanceError] = React.useState("");

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const validateForm = () => {
    const { to, from, cargo_type } = formState;
    console.log(formState)
    console.log(distance)
    console.log(price)
    validate(data)
    if (!to || !from || !cargo_type) {
      if(!to) {
        setToErrors('Field "To" is required')
      } else {
        setToErrors('')
      }
      if(!from) {
        setFromErrors('Field "From" is required')
      } else {
        setFromErrors('')
      }
      if(!cargo_type) {
        console.log(formState.cargo_type)
        setCargoTypeErrors('Field "Cargo Type" is required')
      } else {
        setCargoTypeErrors('')
      }
      if(!cargo_type || !price) {
        setDistanceError(
          "Please callculate distance and price"
        );
      } else {
        setDistanceError('')
      }
      return false;
    }

    return true;
  };

  const handleCalculateDistance = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setDistanceError("");
    if (formState.from === "" || formState.to === "") {
      setDistanceError(
        "Something went wrong while calculating the distance, check the correctness of the filled fields"
      );
    } else {
      const distnce = await calculateDistance(formState.from, formState.to);
      setDistance(Math.round(distnce))
      if(validateForm()) {
        const price = calculateShippingCost(Math.round(distnce), formState.cargo_type, +data.weight, +data.volume)
        console.log(price)
        setPrice(Math.round(price))
      } else {
        setDistanceError(
          "Something went wrong while calculating the price, check the correctness of the filled fields"
        );
      }
    }
  };

  const handleOptionChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    console.log(event.target);
    setFormState((prevState) => ({
      ...prevState,
      [name]: value as string,
    }));
  };

  return (
    <div className="calculator">
      <div className="calculator_inner flex">
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <div className="flex_column">
            <div className="flex">
              <FormControl fullWidth key={0}>
                <SelectInput
                  label="From"
                  name="from"
                  value={formState.from}
                  items={cities}
                  error={fromErrors}
                  onChange={(event: any) => handleOptionChange(event)}
                />
                {fromErrors && <FormHelperText>{fromErrors}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth key={1}>
                <SelectInput
                  label="to"
                  name="to"
                  value={formState.to}
                  items={cities}
                  error={toErrors}
                  onChange={(event: any) => handleOptionChange(event)}
                />
                {toErrors && <FormHelperText>{toErrors}</FormHelperText>}
              </FormControl>

              <FormControl fullWidth key={2}>
                <SelectInput
                  label="Cargo Type"
                  name="cargo_type"
                  value={formState.cargo_type}
                  items={cargoTypeValue}
                  error={cargoTypeErrors}
                  onChange={(event: any) => handleOptionChange(event)}
                />
                {cargoTypeErrors && (
                  <FormHelperText>{cargoTypeErrors}</FormHelperText>
                )}
              </FormControl>
            </div>
            <div className="flex align_center" >
              <InputField name="weight" label="Weight" />
              <InputField name="volume" label="Volume" />
              <button
                className="button_outline "
                type="submit"
                onClick={handleCalculateDistance}
                disabled={enterError ? true : false}
              >
                calculate
              </button>
            </div>
            {distance !== 0 ? (
                <h4>
                  Distance between cities: {distance} km and approximate cost
                  are {price}
                </h4>
              ) : (
                <div className=" calculate_desc flex flex_column">
                  <h4>
                    Fill the From & To fields and press the callculate button
                  </h4>
                  <p>the price of one for one kilometer is 0.5 BYN</p>
                </div>
              )}
              {distanceError && <p className="form_error">{distanceError}</p>}
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CalculateOrder;
