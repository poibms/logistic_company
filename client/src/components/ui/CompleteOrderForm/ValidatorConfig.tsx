import { OrderCreds, OrderType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof OrderType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  distance: {
    isRequired: {
      message: 'Field "Distance" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  fuel: {
    isRequired: {
      message: 'Field "Fuel" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },

};

export default validatorConfig;
