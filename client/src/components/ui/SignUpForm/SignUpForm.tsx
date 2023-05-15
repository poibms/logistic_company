import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { SignUpDataType } from '../../../types/types';
import PasswordInput from '../../HOC/WithPassword';
import Button from '../Button/Button';
import validatorConfig from './validatorConfig';
import InputField from '../../common/InputField/InputField'
import { useNavigate } from 'react-router-dom';
import { getAuthErrors, signUp } from '../../../store/user';
import { useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';

const initialData: SignUpDataType = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  password: '',
};

const SignUpForm = () => {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authError = useSelector(getAuthErrors());
  
  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(signUp(data, () => navigate('/')));
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => PasswordInput(InputField), []);

  
  
  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name='name' label='Name' autoFocus />
          <InputField name='surname' label='Surname' autoFocus />
          <InputField name='phone' label='Phone number' autoFocus type='tel' />
          <InputField name='email' label='Email' autoFocus />
          <InputWithPassword name='password' label='Password' type='password' />
          <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
            Sign Up
          </Button>
      </Form>
      {authError && <p className='form_error'>{authError}</p>}
    </>
  )
}

export default SignUpForm;