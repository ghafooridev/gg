import React, { useEffect } from "react"

import MuiTextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import PropTypes, { func } from "prop-types"

import clsx from "clsx"

import { styles } from "./TextField.Style"

const TextField = function (props) {
  const classes = styles()
  const {
    inputRef,
    name,
    label,
    style,
    className,
    onChange,
    icon,
    rows,
    defaultValue,
    caption,
    error,
    placeholder,
    type,
    testId,
    onEnter,
  } = props
  const [data, setData] = React.useState(defaultValue)

  const onTextChange = function (event) {
    const { value } = event.target
    setData(value)

    if (typeof onChange === "function") {
      onChange({ name, value })
    }
  }

  const onkeypress = function (event) {
    const { value } = event.target
    if (
      value.trim().length &&
      event.key === "Enter" &&
      typeof onEnter === "function"
    ) {
      onEnter(value)
    }
  }

  useEffect(() => {
    setData(defaultValue || "")
  }, [defaultValue])

  return (
    <MuiTextField
      label={label}
      value={data}
      variant="outlined"
      multiline={rows && rows > 1}
      rows={rows}
      name={name}
      inputRef={inputRef}
      style={style}
      type={type}
      placeholder={placeholder}
      error={!!error}
      helperText={error ? error.message : caption}
      classes={{
        root: classes.root,
      }}
      className={className}
      onChange={onTextChange}
      onKeyPress={onkeypress}
      inputProps={{
        "data-testid": testId || name,
        className: classes.input,
      }}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">
            <i className={clsx("material-icons", classes.icon)}>{icon}</i>
          </InputAdornment>
        ),
      }}
    />
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputRef: PropTypes.func,
  type: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  caption: PropTypes.string,
  error: PropTypes.object,
  icon: PropTypes.string,
  defaultValue: PropTypes.string,
  testId: PropTypes.string,
  onEnter: PropTypes.func,
}

TextField.defaultProps = {
  rows: "1",
  type: "text",
}

export default TextField
