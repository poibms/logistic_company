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
  },
};

export default validatorConfig;
