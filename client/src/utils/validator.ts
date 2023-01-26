export type ConfigFieldNameType = {
  message: string;
  value?: number | number[];
};

export type ValidatorConfigType = {
  [key: string]: {
    [key: string]: any;
    isRequired?: ConfigFieldNameType;
    isEmail?: ConfigFieldNameType;
  };
};

export function validator(data: { [key: string]: any }, validatorConfig: ValidatorConfigType) {
  const errors: { [key: string]: string } = {};

  function validate(validateMethod: string, fieldData: string, config: ConfigFieldNameType) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof fieldData === 'boolean') {
          statusValidate = !fieldData;
        } else {
          statusValidate = String(fieldData).trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(fieldData);
        break;
      }

      case 'isMin': {
        console.log(fieldData)
        statusValidate = fieldData.length >= 7 ? false : true;
        break;
      }
      
      case 'isMax': {
        statusValidate = fieldData.length > 32 ? true : false;
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in validatorConfig[fieldName]) {
      const error = validate(validateMethod, data[fieldName], validatorConfig[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
