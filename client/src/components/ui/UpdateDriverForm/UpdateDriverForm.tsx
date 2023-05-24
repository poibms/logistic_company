import { Paper } from "@mui/material";
import React, { useState } from "react";
import { Form, useForm } from "../../../hooks/useForm";
import { DriverType, DriverUpdateType } from "../../../types/types";
import InputField from "../../common/InputField/InputField";
import validatorConfig from "./ValidatorConfig";
import { useAppDispatch } from "../../../store";
import {
  createDriver,
  getDriverErrors,
  updateDriver,
} from "../../../store/drivers";
import { useSelector } from "react-redux";

type AddDriverPropsType = {
  driver: DriverType;
  handleClose: any;
};

interface FileState {
  [key: string]: File | undefined;
}

const UodateDriverForm: React.FC<AddDriverPropsType> = ({
  driver,
  handleClose,
}) => {
  const [selectedFile, setSelectedFile] = React.useState<FileState>({});
  const [fileError, setFileError] = useState(false);
  const driverError = useSelector(getDriverErrors());

  const initialData: DriverUpdateType = {
    name: driver.name,
    surname: driver.surname,
    driving_experience: driver.driving_experience,
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
      formData.append("id", String(driver.id));
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("driving_experience", data.driving_experience);
      if (selectedFile.img) {
        formData.append("photo", selectedFile.img!);
      }
      if (selectedFile.doc) {
        formData.append("docs_img", selectedFile.doc!);
      }
      dispatch(updateDriver(formData, () => handleClose()));
      handleResetForm(e);
    }
  };

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Update Driver</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="name" label="Name" autoFocus />
          <InputField name="surname" label="Surname" />
          <InputField name="driving_experience" label="Driving Experience" />

          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'img')} />
          <input className="mt-10" type="file" onInput={(event) => handleFileSelect(event, 'doc')}/>
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Create Driver
          </button>
        </Form>
        {driverError && <p className="form_error">{driverError}</p>}
        {fileError && <p className='form_error'>File is required</p>}
      </Paper>
    </div>
  );
};

export default UodateDriverForm;
