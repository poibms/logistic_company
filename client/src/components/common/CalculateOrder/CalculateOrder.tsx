import { FormControl, FormHelperText } from "@mui/material";
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
  fromCity: "",
  fromStreet: "",
  fromHouse: "",
  fromBuilding: "",
  toCity: "",
  toStreet: "",
  toHouse: "",
  toBuilding: "",
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

  const { data, errors, enterError, handleInputChange, validate } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const validateForm = () => {
    const { to, from, cargo_type } = formState;
    console.log(formState);
    console.log(distance);
    console.log(price);
    validate(data);
    if (!to || !from || !cargo_type) {
      if (!to) {
        setToErrors('Field "To" is required');
      } else {
        setToErrors("");
      }
      if (!from) {
        setFromErrors('Field "From" is required');
      } else {
        setFromErrors("");
      }
      if (!cargo_type) {
        console.log(formState.cargo_type);
        setCargoTypeErrors('Field "Cargo Type" is required');
      } else {
        setCargoTypeErrors("");
      }
      if (!cargo_type || !price) {
        setDistanceError("Please callculate distance and price");
      } else {
        setDistanceError("");
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
    const from = `${data.fromCity}, ${data.fromStreet} , ${data.fromHouse} ${data.fromBuilding}`;
    const to = `${data.toCity} ${data.toStreet} ${data.toHouse} ${data.toBuilding}`;
    if (
      data.fromCity === "" ||
      data.fromStreet === "" ||
      data.fromHouse === "" ||
      data.toCity === "" ||
      data.toStreet === "" ||
      data.toHouse === ""
    ) {
      setDistanceError(
        "Something went wrong while calculating the distance, check the correctness of the filled fields"
      );
    } else if (from === to) {
      setDistanceError("You cannot choose the same adress");
    } else {
      const distnce = await calculateDistance(from, to);
      console.log("distnce ", distnce);
      setDistance(Math.round(distnce));
      if (
        Math.round(distnce) !== 0 &&
        formState.cargo_type !== "" &&
        data.weight !== "" &&
        data.volume !== ""
      ) {
        const price = calculateShippingCost(
          Math.round(distnce),
          formState.cargo_type,
          +data.weight,
          +data.volume
        );
        setPrice(Math.round(price));
        return { distnce, price };
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
            <div className="flex flex_column">
              <div className="flex">
                <InputField
                  name="fromCity"
                  className="my-text-field"
                  label="City From"
                />
                <InputField
                  name="fromStreet"
                  className="my-text-field"
                  label="Street From"
                />
                <InputField
                  name="fromHouse"
                  className="my-text-field"
                  label="House From"
                />
                <InputField
                  name="fromBuilding"
                  className="my-text-field"
                  label="Building From"
                />
              </div>
              <div className="flex">
                <InputField
                  name="toCity"
                  label="To City"
                  className="my-text-field"
                />
                <InputField
                  name="toStreet"
                  label="To Street"
                  className="my-text-field"
                />
                <InputField
                  name="toHouse"
                  label="To House"
                  className="my-text-field"
                />
                <InputField
                  name="toBuilding"
                  label="To Building"
                  className="my-text-field"
                />
              </div>
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
            <div className="flex align_center">
              <InputField name="weight" label="Weight (tons)" />
              <InputField name="volume" label="Volume (м³)" />
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
                Distance between cities: {distance} km and approximate cost are{" "}
                {price}
              </h4>
            ) : (
              <div className=" calculate_desc flex flex_column">
                <h4>
                  Fill the From & To fields and press the callculate button
                </h4>
                <p>
                  This is a preliminary price, the final price will be
                  calculated after the completion of the order
                </p>
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
