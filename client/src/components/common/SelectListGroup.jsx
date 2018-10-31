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
  const selectOpions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        placeholder={placeholder}
      >
        {selectOpions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
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
