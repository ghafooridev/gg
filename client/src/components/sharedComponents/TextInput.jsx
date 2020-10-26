import React from "react"

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
  } = props

  const onTextChange = function (event) {
    onChange({ value: event.target.value, name })
  }

  return (
    <>
      <label>{label}</label>
      <InputGroup>
        {icon && (
          <InputGroupAddon addonType={addonType}>
            <InputGroupText>{icon}</InputGroupText>
          </InputGroupAddon>
        )}
        <Input
          placeholder={placeholder}
          type={type}
          rows={rows}
          name={name}
          onChange={onTextChange}
        />
      </InputGroup>
    </>
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
}

TextInput.defaultProps = {
  addonType: "prepend",
  rows: "1",
  type: "text",
}

export default TextInput
