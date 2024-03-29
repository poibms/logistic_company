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
  trailer_height: {
    isRequired: {
      message: 'Field "Trailer Height" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  trailer_width: {
    isRequired: {
      message: 'Field "Trailer Width" is required',
    },
    inNum: {
      message: 'Data must be a number'
    },
  },
  trailer_long: {
    isRequired: {
      message: 'Field "Trailer Long" is required',
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
  plate: {
    isRequired: {
      message: 'Field "Plate" is required',
    },
    plateRules: {
      message: "Plate must match example 3007 AB-7"
    }
  },
  vin: {
    isRequired: {
      message: 'Field "Vin" is required',
    },
    vinRules: {
      message: "Length of the Vin code must be 17 symbols"
    }
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
