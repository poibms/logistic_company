import { FormControl, FormHelperText } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createOrder, getOrdersErrors } from "../../../store/orders";
import { OrderCreds } from "../../../types/types";
import calculateDistance from "../../../utils/DistanceCalculator";
import calculateShippingCost from "../../../utils/PriceCalculator";
import InputField from "../../common/InputField/InputField";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SelectInput from "../SelectInput/SelectInput";
import validatorConfig from "./ValidatorConfig";

const initialData: OrderCreds = {
  name: "",
  weight: "",
  fromCity: "",
  fromStreet: "",
  fromHouse: "",
  fromBuilding: "",
  toCity: "",
  toStreet: "",
  toHouse: "",
  toBuilding: "",
  price: 0,
  cargo_type: "",
  distance: 0,
  volume: "",
  image: "",
};

export interface FormState {
  to: string;
  from: string;
  cargo_type: string;
}

export const cargoTypeValue = [
  { id: 1, name: "Bulky cargo" },
  { id: 2, name: "Car transporter" },
  { id: 3, name: "Refrigerator trailer" },
  { id: 4, name: "Common trailer" },
];


const CreateOrder: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<File | undefined>();
  const [fileError, setFileError] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [distanceError, setDistanceError] = React.useState("");

  const [cargoTypeErrors, setCargoTypeErrors] = React.useState("");

  const [formState, setFormState] = React.useState<FormState>({
    to: "",
    from: "",
    cargo_type: "",
  });

  const dispatch = useAppDispatch();
  const orderErrors = useSelector(getOrdersErrors());

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  // const handleFileSelect = (event: any) => {
  //   setSelectedFile(event.target.files[0]);
  //   setFileError(false);
  // };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      setFileError(false);
    } else {
      setSelectedFile(undefined);
    }
  };

  const validateForm = (res: any) => {
    const { cargo_type } = formState;
    console.log(data);
    if (validate(data)) {
      if (!cargo_type || !res.price || !res.distnce) {
        if (!cargo_type) {
          setCargoTypeErrors('Field "Cargo Type" is required');
        } else {
          setCargoTypeErrors("");
        }
        if (!res.price || !res.distnce) {
          setDistanceError("Please callculate distance and price");
        } else {
          setDistanceError("");
        }
        return false;
      }

      return true;
    }
  };

  const handleResetSelect = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormState({
      from: "",
      to: "",
      cargo_type: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCalculateDistance(e).then((res) => {
      if (validateForm(res)) {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("weight", data.weight);
        formData.append("volume", String(data.volume));
        formData.append("from", formState.from);
        formData.append("to", formState.to);
        formData.append("cargo_type", formState.cargo_type);
        formData.append("price", String(Math.round(res!.price)));
        formData.append("distance", String(Math.round(res!.distnce)));
        console.log(selectedFile);
        if (selectedFile) {
          formData.append("image", selectedFile!);
          console.log("valid");
          dispatch(createOrder(formData));
          handleResetForm(e);
          handleResetSelect(e);
          setSelectedFile(undefined);
          setDistance(0);
          setPrice(0);
        } else {
          console.log("check file");
          setFileError(true);
        }
      } else {
        console.log("err");
      }
    });
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
    } else if (formState.from === formState.to) {
      setDistanceError("You cannot choose the same cities");
    } else {
      const distnce = await calculateDistance(formState.from, formState.to);
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
    setFormState((prevState) => ({
      ...prevState,
      [name]: value as string,
    }));
  };

  console.log(fileError);
  console.log(selectedFile);
  return (
    <div className="profile_from">
      <div>
        <h2>Create new Order</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange} className='my-form'>
          <InputField name="name" label="Name" autoFocus className="my-text-field" />
          <InputField name="weight" label="Weight (tons)" className="my-text-field" />
          <InputField name="volume" label="Volume (м³)" className="my-text-field" />
            <InputField name="fromCity" className="my-text-field" label="City From" />
            <InputField name="fromStreet" className="my-text-field" label="Street From" />
            <InputField name="fromHouse"  className="my-text-field" label="House From" />
            <InputField name="fromBuilding" className="my-text-field" label="Building From" />
            <InputField name="toCity" label="To City" className="my-text-field" />
            <InputField name="toStreet" label="To Street" className="my-text-field"/>
            <InputField name="toHouse" label="To House" className="my-text-field" />
            <InputField name="toBuilding" label="To Building" className="my-text-field" />
          <FormControl error={!!errors[2]} fullWidth key={2}>
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
          <input className="mt-10" type="file" onInput={handleFileSelect} />
          <div className="flex calculate_inner justify-between">
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

            <button
              className="button_outline "
              type="submit"
              onClick={handleCalculateDistance}
              disabled={enterError ? true : false}
            >
              calculate
            </button>
          </div>

          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Create order
          </button>
        </Form>
        {orderErrors && <p className="form_error">{orderErrors}</p>}
        {distanceError && <p className="form_error">{distanceError}</p>}
        {fileError && <p className="form_error">File is required</p>}
      </div>
    </div>
  );
};

export default CreateOrder;

