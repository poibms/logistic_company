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
    inNum: {
      message: 'Data must be a number'
    },
  },
  volume: {
    isRequired: {
      message: 'Field "Volume" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },

};

export default validatorConfig;
