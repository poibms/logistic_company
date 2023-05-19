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
      message: 'Field "Year" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
    isMinYear: {
      message: 'The "Year" field must be exactly 4 characters long'
    },
    isMaxYear: {
      message: 'Last year of release - 2023'
    }
  },
  loadCapacity: {
    isRequired: {
      message: 'Field "Load Capacity" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  fuel_consumption: {
    isRequired: {
      message: 'Field "Fuel consumption" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  trailer_volume: {
    isRequired: {
      message: 'Field "Volume" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
};

export default validatorConfig;
