import { SignUpDataType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof SignUpDataType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Поле "Имя" обязательно для заполнения',
    },
  },
  surname: {
    isRequired: {
      message: 'Поле "Фамилия" обязательно для заполнения',
    },
  },
  phone: {
    isRequired: {
      message: 'Поле "Номер телефона" обязательно для заполнения',
    },
  },
  email: {
    isRequired: {
      message: 'Электронная почта обязательна для заполнения',
    },
    isEmail: {
      message: 'Поле "Email" введено не корректно',
    },
  },
  password: {
    isRequired: {
      message: 'Поле "Пароль" обязательно для заполнения',
    },
  },
};

export default validatorConfig;
