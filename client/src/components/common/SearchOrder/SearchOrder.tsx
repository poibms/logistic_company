import * as React from "react";
import InputField from "../InputField/InputField";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { Form, useForm } from "../../../hooks/useForm";
import validatorConfig from "./ValidatorConfig";

const initialData = {
  track_code: "",
};

const SearchOrder: React.FC = () => {
  const [trackCode, setTrackCode] = React.useState("");

  const navigate = useNavigate();

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
      navigate(`/order/${data.track_code}`)
      handleResetForm(e);
    }
  };

  return (
    <div className="searchorder">
      <div className="searchorder_title">
        <h1>Do you have track code? Check status!</h1>
      </div>
      <div className="searchorder_form">
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField
            name="track_code"
            label="track code"
          />
          <button className="button flex align_center" onClick={handleSubmit}>
          <SearchIcon /> Search
        </button>
        </Form>
        
      </div>
    </div>
  );
};

export default SearchOrder;
