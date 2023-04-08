import { YMaps, withYMaps } from "@pbe/react-yandex-maps";
import * as React from "react";
import { useSelector } from "react-redux";
import { Form, useForm } from "../../../hooks/useForm";
import { useAppDispatch } from "../../../store";
import { createOrder, getOrdersErrors } from "../../../store/orders";
import { OrderCreds } from "../../../types/types";
import InputField from "../../common/InputField/InputField";
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

  const dispatch = useAppDispatch();
  const orderErrors = useSelector(getOrdersErrors());

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
      } else {
        setFileError(true);
      }
    }
  };

  return (
    <div>
      <h2>Create new Order</h2>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name="name" label="Name" autoFocus />
        <InputField name="weight" label="Weight" />
        <InputField name="from" label="From" />
        <InputField name="to" label="To" />
        <input className="mt-10" type="file" onInput={handleFileSelect} />
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
      {fileError && <p className="form_error">File is required</p>}
    </div>
  );
};

export default CreateOrder;
