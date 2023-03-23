import { DriverCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof DriverCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  email: {
    isRequired: {
      message: 'Field "Email" is required',
    },
    isEmail: {
      message: 'Field "Email"  entered incorrectly',
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
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  surname: {
    isRequired: {
      message: 'Field "Surname" is required',
    },
  },
  age: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
};

export default validatorConfig;
