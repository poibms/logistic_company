import { FormControl, FormHelperText, SelectChangeEvent } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createOrder, getOrdersErrors } from "../../../store/orders";
import { CargoType, OrderCreds } from "../../../types/types";
import calculateDistance from "../../../utils/DistanceCalculator";
import calculateShippingCost from "../../../utils/PriceCalculator";
import InputField from "../../common/InputField/InputField";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SelectInput from "../SelectInput/SelectInput";
import validatorConfig from "./ValidatorConfig";

const initialData: OrderCreds = {
  name: "",
  weight: "",
  from: "",
  to: "",
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
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [distanceError, setDistanceError] = React.useState("");
  const [cities, setCities] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [fromErrors, setFromErrors] = React.useState("");
  const [toErrors, setToErrors] = React.useState("");
  const [cargoTypeErrors, setCargoTypeErrors] = React.useState("");

  const [formState, setFormState] = React.useState<FormState>({
    to: "",
    from: "",
    cargo_type: "",
  });

  const dispatch = useAppDispatch();
  const orderErrors = useSelector(getOrdersErrors());

  React.useEffect(() => {
    axios
      .get("https://mainapi.nrg-tk.ru/v3/cities?lang=ru", {
        headers: {
          "NrgApi-DevToken":
            "MMGPa7NQ2HwhiHCwDnuQqIWZFJnPYrbX8vBap8StkkrMChvLHiv7OEttx5QFy2kK",
        },
      })
      .then((data) => citiesHandler(data.data.cityList));
  }, []);

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileError(false);
  };

  const citiesHandler = (cityList: any) => {
    const filteredArray = cityList.filter((obj: any) =>
      obj.name.includes("BY")
    );
    // const citiesName = cityList.filter((item: any) => item.parentId === -1);
    setCities(filteredArray);
    setIsLoading(false);
  };

  const validateForm = (res: any) => {
    const { to, from, cargo_type } = formState;
    validate(data);
    if (!to || !from || !cargo_type || !res.price || !res.distnce) {
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
        formData.append("image", selectedFile!);
        if (selectedFile) {
          dispatch(createOrder(formData));
          handleResetForm(e);
          handleResetSelect(e);
          setSelectedFile(null);
          setDistance(0);
          setPrice(0);
        } else {
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
        return {distnce, price}
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

  return (
    <div className="profile_from">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h2>Create new Order</h2>
          <Form data={data} errors={errors} handleChange={handleInputChange}>
            <InputField name="name" label="Name" autoFocus />
            <InputField name="weight" label="Weight (tons)" />
            <InputField name="volume" label="Volume (м³)" />
            <div className="form_select_inner flex">
              <FormControl error={!!errors[0]} fullWidth key={0}>
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
              <FormControl error={!!errors[1]} fullWidth key={1}>
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
            </div>
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
                  Distance between cities: {distance} km and approximate cost
                  are {price}
                </h4>
              ) : (
                <div className=" calculate_desc flex flex_column">
                  <h4>
                    Fill the From & To fields and press the callculate button
                  </h4>
                  <p>This is a preliminary price, the final price will be calculated after the completion of the order</p>
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
      )}
    </div>
  );
};

export default CreateOrder;
