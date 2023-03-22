import { Paper } from "@mui/material";
import * as React from "react";
import { Form, useForm } from "../../../hooks/useForm";
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

const AddTuckForm = () => {
  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      // dispatch(updateUserData(data));
      handleResetForm(e);
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
          <input className="mt-10" name="photo" type="file" />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            disabled={enterError ? true : false}
          >
            Add new Truck
          </button>
        </Form>
        {/* {loginError && <p className='form__enter-error'>{loginError}</p>} */}
      </Paper>
    </div>
  );
};

export default AddTuckForm;
