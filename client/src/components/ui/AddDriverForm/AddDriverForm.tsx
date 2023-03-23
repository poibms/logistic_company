import { Paper } from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { Form, useForm } from "../../../hooks/useForm";
import { DriverCreds } from "../../../types/types";
import InputField from "../../common/InputField/InputField";
import validatorConfig from "./ValidatorConfig";
import PasswordInput from "../../HOC/WithPassword";
import { useAppDispatch } from "../../../store";
import { createDriver } from "../../../store/drivers";

const initialData: DriverCreds = {
  email: "",
  password: "",
  name: "",
  surname: "",
  age: "",
};

const AddDriverForm: React.FC = () => {
  // const [selectedPhoto, setSelectedPhoto] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);

  const handleFileSelect = (event: any) => {
    console.log(event);
    setSelectedFile(event.target.files[0]);
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
    console.log(selectedFile);
    e.preventDefault();
    if (validate(data)) {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("age", data.age);
      formData.append("photo", selectedFile!);
      dispatch(createDriver(formData));
      handleResetForm(e);
    }
  };

  const InputWithPassword = React.useMemo(() => PasswordInput(InputField), []);

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Create Driver</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="email" label="Email" autoFocus />
          <InputWithPassword name="password" label="Password" type="password" />
          <InputField name="name" label="Name" autoFocus />
          <InputField name="surname" label="Surname" />
          <InputField name="age" label="Age" />

          <input className="mt-10" type="file" onInput={handleFileSelect} />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Create Driver
          </button>
        </Form>
        {/* {loginError && <p className='form__enter-error'>{loginError}</p>} */}
      </Paper>
    </div>
  );
};

export default AddDriverForm;
