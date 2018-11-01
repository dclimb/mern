import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const InputGroup = ({
  onChange,
  placeholder,
  name,
  value,
  icon,
  label,
  type,
  error,
  info
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
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

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  loginInfo: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  icon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string.isRequired
};

InputGroup.defaults = {
  type: "text"
};

export default InputGroup;
