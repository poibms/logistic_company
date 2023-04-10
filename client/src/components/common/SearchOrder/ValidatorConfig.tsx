import { OrderType, TruckCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof {track_code: string}]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  track_code: {
    isRequired: {
      message: 'Field "Track code" is required',
    },
  }
};

export default validatorConfig;
