const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = (data) =>{
  let errors = {};

  data.status = isEmpty(data.status) ? '' : data.status;
  data.handle = isEmpty(data.handle) ? '' : data.handle;
  data.skills = isEmpty(data.skills) ? '' : data.skills;

  if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = 'Handle needs to be between 2 and 40 characters'
  }

  if(Validator.isEmpty(data.status)) {
    errors.status = 'Status field is required'
  }

  if(Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required'
  }

  if(Validator.isEmpty(data.skills)) {
    errors.skills = 'Skills field is required'
  }

  if(!isEmpty(data.website)){
    if(!Validator.isURL(data.website)) {
      errors.website = 'Incorrect URL'
    }
  }

  if(!isEmpty(data.youtube)){
    if(!Validator.isURL(data.youtube)) {
      errors.youtube = 'Incorrect URL'
    }
  }

  if(!isEmpty(data.twitter)){
    if(!Validator.isURL(data.twitter)) {
      errors.twitter = 'Incorrect URL'
    }
  }

  if(!isEmpty(data.facebook)){
    if(!Validator.isURL(data.facebook)) {
      errors.facebook = 'Incorrect URL'
    }
  }

  if(!isEmpty(data.linkedin)){
    if(!Validator.isURL(data.linkedin)) {
      errors.linkedin = 'Incorrect URL'
    }
  }

  if(!isEmpty(data.instagram)){
    if(!Validator.isURL(data.instagram)) {
      errors.instagram = 'Incorrect URL'
    }
  }




  return {
    errors,
    isValid: isEmpty(errors),
    status: data.status
  }
};
