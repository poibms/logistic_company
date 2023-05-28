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
    trailer_volume: truck.trailer_volume,
    loadCapacity: truck.loadCapacity,
    trailer_vin: truck.trailer_vin,
    plate: truck.plate,
    fuel_consumption: truck.fuel_consumption,
    trailer_height: truck.trailer_height,
    trailer_width: truck.trailer_width,
    trailer_long: truck.trailer_long,
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
      formData.append("loadCapacity", data.loadCapacity);
      formData.append("fuel_consumption", data.fuel_consumption);
      formData.append("plate", data.plate);
      formData.append("trailer_vin", data.trailer_vin);
      formData.append("trailer_height", data.trailer_height);
      formData.append("trailer_width", data.trailer_width);
      formData.append("trailer_long", data.trailer_long);
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
          <InputField name="loadCapacity" label="LoadCapacity" />
          <InputField name="trailer_volume" label="Volume (м³)" />
          <InputField name="trailer_height" label="Trailer Height (м)" />
          <InputField name="trailer_width" label="Trailer Width (м)" />
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
