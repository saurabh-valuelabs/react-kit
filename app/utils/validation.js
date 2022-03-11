const inValidEmail = text => {
  // eslint-disable-next-line no-useless-escape
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (text !== null && !reg.test(text) && text.length) return true;
  return false;
};

/**
 *
 * @param {*} rules - Field Rule
 * @param {*} value - Field Value
 * @param {*} data - Form Value JSON
 * rules: { isRequired: true, isRequiredConditional: 'field3' , type: 'number', isEmail: true, lessThan: 100, greaterThan: 10, lessThanEqual: 100, greaterThanEqual: 10, equal: 100, lessThanToField: 'filed3', greaterThanToField: 'filed2', lessThanEqualToField: 'filed3', greaterThanEqualToField: 'filed2', equalToField: 'field3', patterMatch:'', minChar:3, maxChar:1000},
 */

export const validateField = (rules, value, formData) => {
  const ruleArr = Object.keys(rules);
  let data = {};
  if (typeof formData.map === 'function') {
    // eslint-disable-next-line array-callback-return
    formData.map(item => {
      data[item.fieldName] = item.value;
    });
  } else {
    data = formData;
  }

  let REGEX;
  const tableValidation = [];
  const newArr = ruleArr.filter((item, index) => {
    const otherItem = rules[item];
    switch (item) {
      case 'isTableDataValid':
        if (value.length > 0) {
          const validRow = {};
          let isValid = true;
          // eslint-disable-next-line array-callback-return
          value.map(tableRow => {
            const validationObj = {};
            // eslint-disable-next-line array-callback-return
            otherItem.map(validationRow => {
              const { fieldName, validationRules } = validationRow;
              let innerValue = tableRow[fieldName];
              if (typeof innerValue === 'undefined' || innerValue === null) {
                innerValue = '';
              }
              const validations = validateField(
                validationRules,
                innerValue,
                tableRow,
              );

              if (validations.length > 0) {
                validationObj[fieldName] = {};
                // eslint-disable-next-line array-callback-return
                validations.map(vItem => {
                  validationObj[fieldName][vItem] = true;
                });
              } else {
                validationObj[fieldName] = false;
              }
              isValid = isValid && validations.length === 0;
              if (!isValid) {
                validRow[tableRow.product_id] = validationObj;
              }
            });
          });
          if (!isValid) {
            tableValidation.push({ key: item, value: validRow, index });
            return true;
          }
        }
        break;
      case 'isRequired':
        if (
          value === '' ||
          value === null ||
          value.length === 0 ||
          (!value && value !== 0)
        ) {
          return true;
        }
        break;
      case 'isRequiredConditional':
        if (data[otherItem] && (value.trim().length === 0 || value === null)) {
          return true;
        }
        break;
      case 'type':
        // eslint-disable-next-line valid-typeof
        if (typeof value !== otherItem) {
          return true;
        }
        break;
      case 'isEmail':
        if (inValidEmail(value)) {
          return true;
        }
        break;
      case 'lessThan':
        if (value >= otherItem) {
          return true;
        }
        break;
      case 'lessThanEqual':
        if (value > otherItem) {
          return true;
        }
        break;
      case 'greaterThan':
        if (value <= otherItem) {
          return true;
        }
        break;
      case 'greaterThanEqual':
        if (value < otherItem) {
          return true;
        }
        break;
      case 'equal':
        if (value !== otherItem) {
          return true;
        }
        break;
      case 'lessThanToField':
        if (value >= data[otherItem]) {
          return true;
        }
        break;
      case 'lessThanEqualToField':
        if (value > data[otherItem]) {
          return true;
        }
        break;
      case 'greaterThanToField':
        if (value <= data[otherItem]) {
          return true;
        }
        break;
      case 'greaterThanEqualToField':
        if (value < data[otherItem]) {
          return true;
        }
        break;
      case 'equalToField':
        if (value !== data[otherItem]) {
          return true;
        }
        break;
      case 'patterMatch':
        REGEX = new RegExp(otherItem);
        if (value && !REGEX.test(value)) {
          return true;
        }
        break;
      case 'minChar':
        if (value.length < otherItem) {
          return true;
        }
        break;
      case 'maxChar':
        if (value.length > otherItem) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  });
  tableValidation.map(tableItem => {
    newArr[tableItem.index] = { key: [tableItem.key], value: tableItem.value };
    return true;
  });
  return newArr;
};

/**
 *
 * @param {*} formFields
 * @example [
    {
      id: 'username',
      fieldName: 'user_name',
      label: '',
      inputIcon: 'fa fa-user',
      placeHolder: 'User Name',
      fieldType: 'text',
      autoComplete: 'username',
      validationRules: {
        isRequired: true,
      },
      validationMessage: 'Please enter your User Name',
      value: '',
      isInvalid: false,
    }
  ],
 * @tutorial
 * @example
  validationRules: { isRequired: true, isRequiredConditional: 'field3' , type: 'number', isEmail: true, lessThan: 100, greaterThan: 10, lessThanEqual: 100, greaterThanEqual: 10, equal: 100, lessThanToField: 'filed3', greaterThanToField: 'filed2', lessThanEqualToField: 'filed3', greaterThanEqualToField: 'filed2', equalToField: 'field3', patterMatch:'', minChar:3, maxChar:1000},
 */

export const validateFormData = (formFields, formValue) => {
  // const validator = {};
  const validationObj = {};
  let isValid = true;
  // eslint-disable-next-line array-callback-return
  formFields.map(field => {
    const { fieldName, validationRules } = field;
    let value = formValue[fieldName];
    // validator[fieldName] = validationRules;
    if (typeof value === 'undefined' || value === null) {
      value = '';
    }
    const validations = validateField(validationRules, value, formValue);
    if (validations.length > 0) {
      validationObj[fieldName] = {};
      // eslint-disable-next-line array-callback-return
      validations.map(item => {
        if (typeof item === 'object') {
          validationObj[fieldName][item.key] = item.value;
        } else {
          validationObj[fieldName][item] = true;
        }
      });
    } else {
      validationObj[fieldName] = false;
    }
    isValid = isValid && validations.length === 0;
  });

  return isValid || validationObj;
};
