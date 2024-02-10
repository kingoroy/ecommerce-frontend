import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { GreenTick } from '../assets/icons';
import classNames from 'classnames';

const InputField = ({ label, name, type = 'text', value, onChange, error, disabled = false, isRequired = false, maxLength='', readOnly=false }) => {
  const [focus, setFocus] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = () => {
    setFocus(true);
  };

  useEffect(() => {
    if (value && value.length > 0) {
      setHasContent(true);
    } else {
      setHasContent(false);
    }
  }, [value]);

  const handleBlur = (e) => {
    setFocus(false);
    if (!e.target.value) {
      setHasContent(false);
    }
  };

  const handleClickLabel = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const successValidation = !error && value;

  const inputWrapper = classNames({
    'react-input-wrapper': true,
    'react-input-wrapper--success': successValidation && !disabled,
    'react-input-wrapper--normal': !successValidation && !disabled,
    'react-input-wrapper--disabled': disabled,
  });

  const labelStyle = classNames({
    'label-text': !(focus || hasContent) && !disabled,
    'label-text-focus': (focus || hasContent) && !disabled,
    'label-text-disabled': !(focus || hasContent) && disabled,
    'label-text-focus-disabled': (focus || hasContent) && disabled,
  });

  const inputStyle = classNames({
    'input-basic': true,
    'input-normal': !successValidation && !disabled,
    'input-success': successValidation && !disabled,
    'input-disabled': disabled,
  });

  return (
    <div className="react-input-container" onClick={handleClickLabel}>
      <label htmlFor={name} className={labelStyle}>
        {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div className={inputWrapper}>
        <input
          ref={inputRef}
          autoComplete="off"
          type={type}
          disabled={disabled}
          maxLength={maxLength}
          id={name}
          name={name}
          onFocus={handleFocus}
          value={value}
          onBlur={handleBlur}
          onChange={onChange}
          className={inputStyle}
          readOnly = {readOnly}
        />
        {successValidation && !disabled && <GreenTick height="20px" width="20px" className="greenTick" />}
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  maxLength: PropTypes.number,
  readOnly:PropTypes.bool,
};

export default InputField;
