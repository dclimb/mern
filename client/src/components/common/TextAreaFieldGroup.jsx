import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TextAreaFieldGroup = ({
  onChange,
  placeholder,
  name,
  value,
  label,
  error,
  info
}) => {
  return (
    <div className="form-group">
      <textarea
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  loginInfo: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

export default TextAreaFieldGroup;
