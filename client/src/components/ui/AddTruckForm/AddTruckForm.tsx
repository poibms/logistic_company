import { FormControl, FormHelperText, Paper } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createTruck, getTruckErrors } from "../../../store/trucks";
import { TruckCreds } from "../../../types/types";
import InputField from "../../common/InputField/InputField";
import { cargoTypeValue } from "../CreateOrderForm/CreateOrder";
import SelectInput from "../SelectInput/SelectInput";
import validatorConfig from "./ValidatorConfig";

const initialData: TruckCreds = {
  name: "",
  model: "",
  year: "",
  loadCapacity: "",
  trailer_volume: "",
  truck_type: "",
  fuel_consumption: "",
  plate: "",
  vin: "",
  docs_img: "",
  trailer_vin: "",
  trailer_height: "",
  trailer_width: "",
  trailer_long: "",
  photo: "",
};

type AddTcuckPropsType = {
  handleClose: any;
};

interface FileState {
  [key: string]: File | undefined;
}

const AddTuckForm: React.FC<AddTcuckPropsType> = ({ handleClose }) => {
  const [selectedFile, setSelectedFile] = React.useState<FileState>({});
  const [fileError, setFileError] = React.useState(false);
  const [cargoType, setCargoType] = React.useState("");
  const [cargoTypeErrors, setCargoTypeErrors] = React.useState("");

  const dispatch = useAppDispatch();
  const truckError = useSelector(getTruckErrors());

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const handleFileSelect = (event: any, name: string) => {
    console.log(event.target.name)
    const selectedFile = event.target.files?.[0];
    setSelectedFile((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
    setFileError(false);
  };

  const validateForm = () => {
    const isValid = validate(data);
    console.log(isValid)
    if (!cargoType) {
      setCargoTypeErrors('Field "Cargo Type" is required');
      return false;
    } else {
      setCargoTypeErrors("");
    }
    return isValid
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("loadCapacity", data.loadCapacity);
      formData.append("trailer_volume", data.trailer_volume);
      formData.append("fuel_consumption", data.fuel_consumption);
      formData.append("plate", data.plate);
      formData.append("vin", data.vin.toUpperCase());
      formData.append("trailer_vin", data.trailer_vin.toUpperCase());
      formData.append("trailer_height", data.trailer_height);
      formData.append("trailer_width", data.trailer_width);
      formData.append("trailer_long", data.trailer_long);
      formData.append("truck_type", cargoType);
      formData.append("photo", selectedFile.img!);
      formData.append("docs_img", selectedFile.doc!);
      if (selectedFile.img && selectedFile.doc) {
        dispatch(createTruck(formData, () => handleClose()));
        handleResetForm(e);
        setCargoType("")
      } else {
        setFileError(true);
      }
    }
  };

  const handleChangeCargoType = (
    event: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    setCargoType(event.target.value);
  };

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Add Truck</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="name" label="name" autoFocus />
          <InputField name="model" label="model" />
          <InputField name="year" label="year" />
          <InputField name="loadCapacity" label="Load Capacity (tons)" />
          <InputField name="trailer_volume" label="Volume (м³)" />
          <InputField name="trailer_height" label="Trailer Height (м)" />
          <InputField name="trailer_width" label="Trailer Width (м)" />
          <InputField name="trailer_long" label="Trailer Long (м)" />
          <InputField name="fuel_consumption" label="Fuel Consumption (litters/per 100 km)" />
          <InputField name="vin" label="Vin" placeholder="WF0PXXGCHPJA77397" />
          <InputField name="plate" label="Plate" placeholder="3007 AB-7"/>
          <FormControl error={!!errors[2]} fullWidth key={2}>
            <SelectInput
              label="Cargo Type"
              name="cargo_type"
              value={cargoType}
              items={cargoTypeValue}
              error={cargoTypeErrors}
              onChange={(event: any) => handleChangeCargoType(event)}
            />
            {cargoTypeErrors && (
              <FormHelperText>{cargoTypeErrors}</FormHelperText>
            )}
          </FormControl>
          <InputField name="trailer_vin" label="Trailer Vin" placeholder="WF0PXXGCHPJA77397" />
          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'img')} />
          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'doc')}/>
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Add new Truck
          </button>
        </Form>
        {truckError && <p className="form_error">{truckError}</p>}
        {fileError && <p className="form_error">File is required</p>}
      </Paper>
    </div>
  );
};

export default AddTuckForm;
