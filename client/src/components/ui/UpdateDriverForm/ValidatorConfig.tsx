import { DriverCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof DriverCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  surname: {
    isRequired: {
      message: 'Field "Surname" is required',
    },
  },
  driving_experience: {
    isRequired: {
      message: 'Field "Driving Experience" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
    isMinExperience: {
      message: 'Minimum driving experience - 1 year'
    },
  },
};

export default validatorConfig;
