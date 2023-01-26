import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { SignInDataType } from '../../../types/types';
import PasswordInput from '../../HOC/WithPassword';
import Button from '../Button/Button';
import validatorConfig from './validatorConfig';
import InputField from '../../common/InputField/InputField'
import authService from '../../../services/auth.service';

const initialData: SignInDataType = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      const res = await authService.signIn(data);
      console.log(res);
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => PasswordInput(InputField), []);

  
  
  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='Email' autoFocus />
        <InputWithPassword name='password' label='Пароль' type='password' />
        <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
          Войти
        </Button>
    </Form>
  )
}

export default SignInForm;