import { Paper } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, useForm } from '../../../hooks/useForm';
import { useAppDispatch } from '../../../store';
import InputField from '../../common/InputField/InputField';
import validatorConfig from './ValidatorConfig';

const initialData = {
  err_message: ""
}

type CancelOrderPropsType = {
  handleCancel: any;
}

const CancelOrderModal: React.FC<CancelOrderPropsType> = ({handleCancel}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data,
    errors,
    handleInputChange,
    validate
  } = useForm(initialData, false, validatorConfig);

  const validateCancelOrder = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(validate(data)) {
      handleCancel(e, data.err_message)
    }
  }

  return (  
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Cancel order</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="err_message" label="Error Message" autoFocus />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={validateCancelOrder}
            // disabled={enterError ? true : false}
          >
            Complete Order
          </button>
        </Form>
      </Paper>
    </div>
  );
}
 
export default CancelOrderModal;