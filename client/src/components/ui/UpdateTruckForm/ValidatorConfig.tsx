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
    inNum: {
      message: 'Data must be a number'
    },
    isMinYear: {
      message: 'The "Year" field must be exactly 4 characters long'
    }
  },

  loadCapacity: {
    isRequired: {
      message: 'Field "Load Capacity" is required',
    },
    inNum: {
      message: 'Data must be a number'
    }
  },
};

export default validatorConfig;
