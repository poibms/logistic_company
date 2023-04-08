import { OrderCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof OrderCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  weight: {
    isRequired: {
      message: 'Field "Surname" is required',
    },
  },
  from: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
  to: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
};

export default validatorConfig;
