import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextFieldGroup = ({
  onChange,
  defaultValue,
  type,
  placeholder,
  name,
  value,
  disabled,
  label,
  error,
  info
}) => {
  return (
    <div className="form-group">
      <input
        onChange={onChange}
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        defaultValue={defaultValue}
        name={name}
        value={value}
        disabled={disabled}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  loginInfo: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  info: PropTypes.string
};
TextFieldGroup.defaults = {
  type: "text"
};
export default TextFieldGroup;
