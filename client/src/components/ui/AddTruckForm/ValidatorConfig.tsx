import { TruckCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof TruckCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  model: {
    isRequired: {
      message: 'Field "Surname" is required',
    },
  },
  year: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
  loadCapacity: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
};

export default validatorConfig;
