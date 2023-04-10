import { DriverCreds, TruckUpdateType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof TruckUpdateType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  model: {
    isRequired: {
      message: 'Field "Model" is required',
    },
  },
  year: {
    isRequired: {
      message: 'Field "Age" is required',
    },
  },
  loadCapacity: {
    isRequired: {
      message: 'Field "Load Capacity" is required',
    },
  },
};

export default validatorConfig;
