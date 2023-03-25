import { Paper } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createTruck, getTruckErrors } from "../../../store/trucks";
import { TruckCreds } from "../../../types/types";
import InputField from "../../common/InputField/InputField";
import validatorConfig from "./ValidatorConfig";

const initialData: TruckCreds = {
  name: "",
  model: "",
  year: "",
  loadCapacity: "",
  photo: "",
};

type AddTcuckPropsType = {
  handleClose: any
}

const AddTuckForm: React.FC<AddTcuckPropsType> = ({handleClose}) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [fileError, setFileError] = React.useState(false);

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

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setFileError(false)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("model", data.model);
      formData.append("year", data.year);
      formData.append("loadCapacity", data.loadCapacity);
      formData.append("photo", selectedFile!);
      if(selectedFile) {
        dispatch(createTruck(formData, () => handleClose()));
        handleResetForm(e);
      } else {
        setFileError(true)
      }
    }
  };

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Add Truck</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="name" label="name" autoFocus />
          <InputField name="model" label="model" />
          <InputField name="year" label="year"/>
          <InputField name="loadCapacity" label="Load Capacity"/>
          <input className="mt-10" type="file" onInput={handleFileSelect} />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Add new Truck
          </button>
        </Form>
        {truckError && <p className='form_error'>{truckError}</p>}
        {fileError && <p className='form_error'>File is required</p>}
      </Paper>
    </div>
  );
};

export default AddTuckForm;
