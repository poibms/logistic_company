import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { SignInDataType } from '../../../types/types';
import PasswordInput from '../../HOC/WithPassword';
import Button from '../Button/Button';
import validatorConfig from './validatorConfig';
import InputField from '../../common/InputField/InputField'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { getAuthErrors, signIn } from '../../../store/user';
import { useSelector } from 'react-redux';

const initialData: SignInDataType = {
  email: '',
  password: '',
};

const SignInForm = () => {

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
      dispatch(signIn(data, () => navigate('/')))
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => PasswordInput(InputField), []);

  
  
  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
          <InputField name='email' label='Email' autoFocus />
          <InputWithPassword name='password' label='Password' type='password' />
          <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
            Sign In
          </Button>
      </Form>
      {authError && <p className='form_error'>{authError}</p>}
    </>
  )
}

export default SignInForm;