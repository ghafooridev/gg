import React, { useEffect } from "react"

import MuiTextField from "@material-ui/core/TextField"
import { Grid } from "@material-ui/core"
import InputAdornment from "@material-ui/core/InputAdornment"

import PropTypes from "prop-types"

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
  } = props
  const [data, setData] = React.useState(defaultValue)

  const onTextChange = function (event) {
    const { value } = event.target
    setData(data)

    if (typeof onChange === "function") {
      onChange(value)
    }
  }

  useEffect(() => {
    setData(defaultValue || "")
  }, [defaultValue])

  return (
    <Grid item xs={6}>
      <MuiTextField
        label={label}
        variant="outlined"
        multiline={rows && rows > 1}
        rows={rows}
        name={name}
        inputRef={inputRef}
        style={style}
        classes={{
          root: classes.root,
        }}
        className={className}
        onChange={onTextChange}
        startAdornment={
          icon && (
            <InputAdornment position="start">
              <i className="material-icons">{icon}</i>
            </InputAdornment>
          )
        }
        {...props}
      />
    </Grid>
  )
}

TextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  inputRef: PropTypes.string,
  rows: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  caption: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  icon: PropTypes.string,
  defaultValue: PropTypes.string,
}

TextField.defaultProps = {
  rows: 1,
  type: "text",
}

export default TextField
