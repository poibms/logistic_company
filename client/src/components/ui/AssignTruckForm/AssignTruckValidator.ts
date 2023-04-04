import { AssignTruckType } from './../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof AssignTruckType]?: ValidatorConfigType[Property];
};

const AssignTruckValidator: ConfigType = {
  truckId: {
    isRequired: {
      message: '"Truck" is required',
    },
  },
};

export default AssignTruckValidator;
