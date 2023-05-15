import { OrderCreds, OrderType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof OrderType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  err_message: {
    isRequired: {
      message: 'Field "Err_message" is required',
    },
  },

};

export default validatorConfig;
