import { OrderCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof OrderCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  distance: {
    isRequired: {
      message: 'Field "Volume" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },

};

export default validatorConfig;
