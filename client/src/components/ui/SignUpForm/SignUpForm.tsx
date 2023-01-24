import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { SignInDataType } from '../../../types/types';
import PasswordInput from '../../HOC/WithPassword';
import Button from '../Button/Button';
import validatorConfig from './validatorConfig';
import InputField from '../../common/InputField/InputField'

const initialData: SignInDataType = {
  email: '',
  password: '',
};

const SignUpForm = () => {

  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      // const redirect = history.location.state ? history.location.state.from.pathname : '/';
      handleResetForm(e);
    }
  };

  const InputWithPassword = useMemo(() => PasswordInput(InputField), []);

  
  
  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='name' label='Имя' autoFocus />
        <InputField name='surname' label='Фамилия' autoFocus />
        <InputField name='phone' label='Номер телефона' autoFocus type='tel' />
        <InputField name='email' label='Email' autoFocus />
        <InputWithPassword name='password' label='Пароль' type='password' />
        <Button className=' button button_sign' type='submit' onClick={handleSubmit} disabled={enterError ? true : false}>
          Зарегистрироваться
        </Button>
    </Form>
  )
}

export default SignUpForm;