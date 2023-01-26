import { SignInDataType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof SignInDataType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
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
    isMin: {
      message: 'Длинна поля "Пароль" должно быть 7 или более символов ',
    },
    isMax: {
      message: 'Длинна поля "Пароль" должно быть менее 32 символов ',
    },
  },
};

export default validatorConfig;
