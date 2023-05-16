import { DriverCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof DriverCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
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
    inNum: {
      message: 'Data must be a number'
    },
    isMinAge: {
      message: 'Minimum age - 24'
    },
  },
};

export default validatorConfig;
