import React  from "react"

import MuiTextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import PropTypes from "prop-types"

import clsx from "clsx"

import { styles } from "./Password.Style"

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
    caption,
    error,
    placeholder,
    onEnter,
  } = props
  const [data, setData] = React.useState("")
  const [isPassword, setIsPassword] = React.useState(true)

  const onTextChange = function (event) {
    const { value } = event.target
    setData(data)

    if (typeof onChange === "function") {
      onChange({ name, value })
    }
  }

  const onChangeViewClick = function () {
    setIsPassword(!isPassword)
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

  return (
    <MuiTextField
      label={label}
      variant="outlined"
      name={name}
      type={isPassword ? "password" : "text"}
      inputRef={inputRef}
      style={style}
      placeholder={placeholder}
      error={!!error}
      helperText={error ? error.message : caption}
      classes={{
        root: classes.root,
      }}
      className={className}
      onChange={onTextChange}
      onKeyPress={onkeypress}
      InputProps={{
        startAdornment: icon && (
          <InputAdornment position="start">
            <i className={clsx("material-icons", classes.icon)}>{icon}</i>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <i
              style={{ cursor: "pointer" }}
              className={clsx("material-icons", classes.icon)}
              onClick={onChangeViewClick}
            >
              {isPassword ? "visibility_off" : "visibility"}
            </i>
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
  rows: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  caption: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.string,
}

export default TextField
