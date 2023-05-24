import { SignInDataType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof SignInDataType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  email: {
    isRequired: {
      message: 'Field "Email" is required',
    },
    isEmail: {
      message: 'The field "Email" is entered incorrectly',
    },
  },
  password: {
    isRequired: {
      message: 'Field "Password" is required',
    },
    isMin: {
      message: 'The length of the "Password" field must be 7 or more characters',
    },
    isMax: {
      message: 'The length of the "Password" field must be less than 32 characters',
    },
  },
};

export default validatorConfig;
