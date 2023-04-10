import { Paper } from "@mui/material";
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
import { updateTruck } from "../../../store/trucks";

type UpdateTruckPropsType = {
  truck: TruckType;
  handleClose: any;
};

const UpdateTruckForm: React.FC<UpdateTruckPropsType> = ({
  truck,
  handleClose,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const driverError = useSelector(getDriverErrors());

  const initialData: TruckUpdateType = {
    name: truck.name,
    model: truck.model,
    year: truck.year,
    loadCapacity: truck.loadCapacity,
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
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
      if (selectedFile) {
        formData.append("photo", selectedFile!);
      }
      dispatch(updateTruck(formData, () => handleClose()));
      handleResetForm(e);
    }
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

          <input className="mt-10" type="file" onInput={handleFileSelect} />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Update Truck
          </button>
        </Form>
        {driverError && <p className="form_error">{driverError}</p>}
      </Paper>
    </div>
  );
};

export default UpdateTruckForm;
