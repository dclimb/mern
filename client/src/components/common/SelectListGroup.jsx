import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const SelectListGroup = ({
  onChange,
  name,
  placeholder,
  value,
  label,
  error,
  info,
  options
}) => {
  return (
    <div className="form-group">
      <textarea
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  loginInfo: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  info: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListGroup;
