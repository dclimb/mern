const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = value => {
  let errors = {};

  value.commentText = isEmpty(value.commentText) ? "" : value.commentText;

  if (Validator.isEmpty(value.commentText)) {
    errors.commentText = "Text field is request" + value.commentText;
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
