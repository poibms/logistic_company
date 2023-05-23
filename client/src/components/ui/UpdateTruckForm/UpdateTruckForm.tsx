import { FormControl, FormHelperText, Paper } from "@mui/material";
import React, { useState } from "react";
import { Form, useForm } from "../../../hooks/useForm";
import {
  DriverType,
  DriverUpdateType,
  TruckType,
  TruckUpdateType,
} from "../../../types/types";
import InputField from "../../common/InputField/InputField";
import validatorConfig from "./ValidatorConfig";
import { useAppDispatch } from "../../../store";
import {
  createDriver,
  getDriverErrors,
  updateDriver,
} from "../../../store/drivers";
import { useSelector } from "react-redux";
import { getTruckErrors, updateTruck } from "../../../store/trucks";
import SelectInput from "../SelectInput/SelectInput";
import { cargoTypeValue } from "../CreateOrderForm/CreateOrder";

type UpdateTruckPropsType = {
  truck: TruckType;
  handleClose: any;
};

interface FileState {
  [key: string]: File | undefined;
}

const UpdateTruckForm: React.FC<UpdateTruckPropsType> = ({
  truck,
  handleClose,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<FileState>({});
  const [fileError, setFileError] = useState(false);
  const [cargoType, setCargoType] = React.useState(String(truck.truck_type));
  const [cargoTypeErrors, setCargoTypeErrors] = React.useState("");
  const trucksErrors = useSelector(getTruckErrors());

  const initialData: TruckUpdateType = {
    name: truck.name,
    model: truck.model,
    year: truck.year,
    loadCapacity: truck.loadCapacity,
    trailer_vin: truck.trailer_vin,
    plate: truck.plate,
    fuel_consumption: truck.fuel_consumption
  };

  const handleFileSelect = (event: any, name: string) => {
    console.log(event.target.name)
    const selectedFile = event.target.files?.[0];
    setSelectedFile((prevFiles) => ({ ...prevFiles, [name]: selectedFile }));
    setFileError(false);
  };

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      console.log("validate");
      const formData = new FormData();
      formData.append("id", String(truck.id));
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("loadCapacity", data.loadCapacity);
      formData.append("fuel_consumption", data.fuel_consumption);
      formData.append("plate", data.plate);
      formData.append("trailer_vin", data.trailer_vin);
      formData.append("truck_type", cargoType);
      if (selectedFile.img) {
        formData.append("photo", selectedFile.img!);
      }
      if (selectedFile.doc) {
        formData.append("docs_img", selectedFile.doc!);
      }
      if(!trucksErrors) {
      dispatch(updateTruck(formData, () => handleClose()));
        handleResetForm(e);
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
        <h2>Update Truck</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="name" label="Name" autoFocus />
          <InputField name="model" label="Model" />
          <InputField name="year" label="Year" />
          <InputField name="loadCapacity" label="LoadCapacity" />
          <InputField name="fuel_consumption" label="Fuel Consumption (litters/per 100 km)" />
          <InputField name="plate" label="Plate" placeholder="3007 AB-7"/>
          <InputField name="trailer_vin" label="Trailer Vin" placeholder="WF0PXXGCHPJA77397" />
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
          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'img')} />
          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'doc')}/>
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Update Truck
          </button>
        </Form>
        {fileError && <p className="form_error">{fileError}</p>}
        {trucksErrors && <p className="form_error">{trucksErrors}</p>}
      </Paper>
    </div>
  );
};

export default UpdateTruckForm;
