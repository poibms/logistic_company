import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { YMaps, withYMaps } from "@pbe/react-yandex-maps";
import axios from "axios";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createOrder, getOrdersErrors } from "../../../store/orders";
import { OrderCreds } from "../../../types/types";
import calculateDistance from "../../../utils/DistanceCalculator";
import InputField from "../../common/InputField/InputField";
import SelectInput from "../SelectInput/SelectInput";
import validatorConfig from "./ValidatorConfig";

const initialData: OrderCreds = {
  name: "",
  weight: "",
  from: "",
  to: "",
  image: "",
};

type CreateOrderPropsType = {};

const CreateOrder: React.FC<CreateOrderPropsType> = () => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [distanceError, setDistanceError] = React.useState("");
  const [cities, setCities] = React.useState([{}]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");

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

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("weight", data.weight);
      formData.append("from", data.from);
      formData.append("to", data.to);
      formData.append("image", selectedFile!);
      if (selectedFile) {
        dispatch(createOrder(formData));
        handleResetForm(e);
        setSelectedFile(null);
        setDistance(0);
      } else {
        setFileError(true);
      }
    }
  };

  const handleCalculateDistance = async (
    e: React.FormEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setDistanceError("");
    const calc = await calculateDistance(from, to);
    if (calc === 0) {
      setDistanceError(
        "Something went wrong while calculating the distance, check the correctness of the filled fields"
      );
    } else {
      setDistance(Math.round(calc));
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setFrom(event.target.value);
  };

  const handleChangeTo = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setTo(event.target.value);
  };


  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div>
          <h2>Create new Order</h2>
          <Form data={data} errors={errors} handleChange={handleInputChange}>
            <InputField name="name" label="Name" autoFocus />
            <InputField name="weight" label="Weight" />
            <div className="form_select_inner flex">
              <SelectInput
                label="From"
                name="from"
                value={from}
                items={cities}
                handleChange={handleChange}
              />
              <SelectInput
                label="to"
                name='to'
                value={to}
                items={cities}
                handleChange={handleChangeTo}
              />
            </div>
            <input className="mt-10" type="file" onInput={handleFileSelect} />
            <div className="flex calculate_inner justify-between">
              {distance !== 0 ? (
                <h4>Distance between cities: {distance} km</h4>
              ) : (
                <h4>
                  Fill the From & To fields and press the callculate button
                </h4>
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
    </>
  );
};

export default CreateOrder;
