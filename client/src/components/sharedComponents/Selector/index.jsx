import React, { useEffect, useState } from "react"

import MuiTextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import PropTypes from "prop-types"

import clsx from "clsx"

import MenuItem from "@material-ui/core/MenuItem"

import { styles } from "./Selector.Style"

const Selector = function (props) {
  const classes = styles()
  const {
    name,
    inputRef,
    label,
    style,
    className,
    defaultValue,
    caption,
    error,
    icon,
    options,
    placeholder,
  } = props

  const initValue = defaultValue || { text: "", value: "" }

  const [list, setList] = useState(options)
  const [selectedData, setSelectedData] = useState(initValue)
  const [data, setData] = useState(defaultValue && defaultValue.text)
  const [isExpand, setIsExpand] = useState(false)

  const onSelectChange = function (event) {
    const { value } = event.target

    setData(data)
    setSelectedData(initValue)

    if (value) {
      const filteredList = options.filter((item) =>
        item.text.startsWith(value.toLowerCase())
      )
      return setList(filteredList)
    }

    setList([])
  }

  const onSelectData = function (item) {
    setSelectedData(item)
    setList([])
    setIsExpand(false)
  }

  const loadItems = function () {
    return list.map((item, index) => {
      return (
        <MenuItem
          key={index}
          value={item.value}
          onClick={() => onSelectData(item)}
        >
          {item.text}
        </MenuItem>
      )
    })
  }

  const onExpandClick = function () {
    if (isExpand) {
      setList([])
      setIsExpand(false)
    } else {
      setList(options)
      setIsExpand(true)
    }
  }

  // Just for making sure the list is empty before typing a character
  useEffect(() => {
    if (!data) {
      setList([])
    }
  }, [data])

  return (
    <div className={classes.container}>
      <MuiTextField
        label={label}
        variant="outlined"
        name={name}
        style={style}
        error={!!error}
        helperText={error ? error.message : caption}
        inputRef={inputRef}
        value={selectedData.text ? selectedData.text : data}
        classes={{
          root: classes.root,
        }}
        onChange={onSelectChange}
        placeholder={placeholder}
        className={className}
        InputProps={{
          startAdornment: icon && (
            <InputAdornment position="start">
              <i className={clsx("material-icons", classes.icon)}>{icon}</i>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" onClick={onExpandClick}>
              <i className={clsx("material-icons", classes.expandIcon)}>
                {isExpand ? "expand_less" : "expand_more"}
              </i>
            </InputAdornment>
          ),
        }}
      />

      <div className={classes.menuContainer}>{loadItems()}</div>
    </div>
  )
}

Selector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  caption: PropTypes.string,
  error: PropTypes.object,
  icon: PropTypes.string,
  defaultValue: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  inputRef: PropTypes.func,
  options: PropTypes.array,
}

// Selector.defaultProps = {
//   defaultValue: {
//     text: "",
//     value: "",
//   },
// }

export default Selector
