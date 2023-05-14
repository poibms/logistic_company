import { Paper } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, useForm } from '../../../hooks/useForm';
import { useAppDispatch } from '../../../store';
import { completeOrder } from '../../../store/orders';
import { DriverType, OrderType } from '../../../types/types';
import calculateShippingCost from '../../../utils/PriceCalculator';
import InputField from '../../common/InputField/InputField';
import validatorConfig from './ValidatorConfig';

type CompleteOrderPropsType = {
  order: OrderType;
  driver: DriverType;
}
const CompleteOrderForm:React.FC<CompleteOrderPropsType> = ({order, driver}) => {

  const initialData: any = {
    distance: order.distance
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    data,
    errors,
    enterError,
    handleInputChange,
    validate,
    handleResetForm,
  } = useForm(initialData, false, validatorConfig);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const price = calculateShippingCost(data.distance, order.cargo_type, +order.weight, +order.volume, driver.truckId?.fuel_consumption)
    dispatch(completeOrder({id: order.id, distance: data.distance, price: Math.floor(price)}, () => navigate('/profile')))
  }

  return (
    <div className="sign_form-wrapper">
      <Paper elevation={3} className="login_form-card form_card">
        <h2>Complete order</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name="distance" label="Distance (km)" autoFocus />
          <button
            className="button_outline button_modal"
            type="submit"
            onClick={handleSubmit}
            // disabled={enterError ? true : false}
          >
            Complete Order
          </button>
        </Form>
      </Paper>
    </div>
  );
}
 
export default CompleteOrderForm;