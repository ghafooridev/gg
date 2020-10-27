import React, { useState } from "react"

import PropTypes from "prop-types"

import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap"

const TextInput = function (props) {
  const {
    label,
    placeholder,
    icon,
    addonType,
    rows,
    type,
    name,
    onChange,
    caption,
    innerRef,
    error,
  } = props
  const [textType, setTextType] = useState(type)

  const onTextChange = function (event) {
    if (typeof onChange === "function") {
      onChange({ value: event.target.value, name })
    }
  }

  const onViewPassword = function () {
    if (textType === "password") {
      return setTextType("text")
    }

    setTextType("password")
  }

  return (
    <div>
      <label>{label}</label>
      <InputGroup>
        {icon && (
          <InputGroupAddon addonType={addonType}>
            <InputGroupText>{icon}</InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          placeholder={placeholder}
          type={textType}
          rows={rows}
          name={name}
          onChange={onTextChange}
          innerRef={innerRef}
        />
        {type === "password" && (
          <InputGroupAddon addonType="append">
            <InputGroupText>
              {textType === "password" ? (
                <i
                  className="passwordIcon fas fa-eye-slash"
                  onClick={onViewPassword}
                />
              ) : (
                <i
                  className="passwordIcon fas fa-eye"
                  onClick={onViewPassword}
                />
              )}
            </InputGroupText>
          </InputGroupAddon>
        )}
      </InputGroup>
      {error ? (
        <small className="form-text text-danger">{error.message}</small>
      ) : (
        <small className="form-text">{caption}</small>
      )}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
  addonType: PropTypes.string,
  rows: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  caption: PropTypes.string,
  innerRef: PropTypes.string,
  error: PropTypes.oneOfType(PropTypes.string, PropTypes.bool),
}

TextInput.defaultProps = {
  addonType: "prepend",
  rows: "1",
  type: "text",
}

export default TextInput
