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
      message: 'Field "Weight" is required',
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
  fromCity: {
    isRequired: {
      message: 'Field "City From" is required'
    },
  },
  fromStreet: {
    isRequired: {
      message: 'Field "Street From" is required'
    },
  },
  fromHouse: {
    isRequired: {
      message: 'Field "House From" is required'
    },
  },
  toCity: {
    isRequired: {
      message: 'Field "City To" is required'
    },
  },
  toStreet: {
    isRequired: {
      message: 'Field "City To" is required'
    },
  },
  toHouse: {
    isRequired: {
      message: 'Field "House To" is required'
    },
  }

};

export default validatorConfig;
