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
    console.log(validateMethod)
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
        statusValidate = fieldData.length >= 7 ? false : true;
        break;
      }

      case 'isMinYear': {
        console.log(fieldData)
        console.log(/^\d{4}$/.test(fieldData))
        const yearRegExp = /^\d{4}$/;
        statusValidate = !yearRegExp.test(fieldData);
        break;
      }

      case 'isMaxYear': {
        console.log(fieldData)
        console.log(/^\d{4}$/.test(fieldData))
        statusValidate = Number(fieldData) > 2023 ? true: false;
        break;
      }
      
      case 'isMax': {
        statusValidate = fieldData.length > 32 ? true : false;
        break;
      }

      case 'isMinExperience': {
        statusValidate = Number(fieldData) < 1 ? true : false;
        break;
      }

      case 'inNum': {
        const numRegExp = /^\d+$/;
        statusValidate = !numRegExp.test(fieldData);
        break;
      }
      case 'plateRules': {
        const plateRegExp = /^[0-9]{4}\s[A-Z]{2}-[0-7]{1}$/;
        statusValidate = !plateRegExp.test(fieldData.toUpperCase());
        break;
      }

      case 'vinRules': {
        statusValidate = fieldData.length === 17 ? false : true;
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
