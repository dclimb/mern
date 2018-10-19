const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (value) => {
  let errors = {};

  value.text = isEmpty(value.text) ? '' : value.text;


  if(Validator.isEmpty(value.text)){
    errors.text = 'Text field is request'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};
