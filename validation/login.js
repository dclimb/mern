const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (value) => {
  let errors = {};

  value.email = isEmpty(value.email) ? '' : value.email;
  value.password = isEmpty(value.password) ? '' : value.password;

  if (!Validator.isEmail(value.email)) {
    errors.email = 'Invalid email'
  }

  if(Validator.isEmpty(value.email)){
    errors.email = 'Email field is request'
  }

  if(Validator.isEmpty(value.password)){
    errors.password = 'Password field is request'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

};
