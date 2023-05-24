import { DriverCreds, TruckUpdateType } from '../../../types/types';
import { ValidatorConfigType } from '../../../utils/validator';

type ConfigType = {
  [Property in keyof TruckUpdateType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  name: {
    isRequired: {
      message: 'Field "Name" is required',
    },
  },
  model: {
    isRequired: {
      message: 'Field "Model" is required',
    },
  },
  year: {
    isRequired: {
      message: 'Field "Age" is required',
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
    }
  },
  plate: {
    isRequired: {
      message: 'Field "Plate" is required',
    },
    plateRules: {
      message: "Plate must match example 3007 AB-7"
    }
  },
  fuel_consumption: {
    isRequired: {
      message: 'Field "Fuel consumption" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  trailer_vin: {
    isRequired: {
      message: 'Field "Vin" is required',
    },
    vinRules: {
      message: "Length of the Vin code must be 17 symbols"
    }
  },
};

export default validatorConfig;
