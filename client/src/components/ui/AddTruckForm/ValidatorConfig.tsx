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
    inNum: {
      message: 'Data must be a number'
    },
  },
  loadCapacity: {
    isRequired: {
      message: 'Field "Age" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  trailer_volume: {
    isRequired: {
      message: 'Field "Age" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
};

export default validatorConfig;
