import React, { useEffect, useState } from "react"

import MuiTextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import PropTypes from "prop-types"

import clsx from "clsx"

import MenuItem from "@material-ui/core/MenuItem"

import { FixedSizeList as List } from "react-window"
import collegeList from "src/assets/json/colleges.json"
import { styles } from "./UniversitySelector.Style"

const MenuList = function ({ options, onSelectData }) {
  return (
    <List
      height={110}
      itemCount={options.length}
      itemSize={35}
      initialScrollOffset={0}
    >
      {({ index, style }) => (
        <MenuItem
          style={style}
          value={options[index].value}
          onClick={() => onSelectData(options[index])}
        >
          {options[index].text}
        </MenuItem>
      )}
    </List>
  )
}

const UniversitySelector = function (props) {
  const classes = styles()

  const { inputRef, style, className, caption, error, defaultValue,onSelect } = props
  const [isExpand, setIsExpand] = useState(false)
  const [selectedData, setSelectedData] = useState({ value: "", text: "" })

  const onExpandClick = function () {
    setIsExpand(!isExpand)
  }

  const onSelectData = function (value) {
    setSelectedData(value)
    setIsExpand(false)

    if(typeof onSelect==="function") {
      onSelect(value)
    }
  }

  useEffect(() => {
    setSelectedData({ text: defaultValue } || "")
  }, [defaultValue])

  return (
    <div className={classes.container}>
      <MuiTextField
        label="University"
        variant="outlined"
        name="university"
        style={style}
        error={!!error}
        helperText={error ? error.message : caption}
        inputRef={inputRef}
        value={selectedData.text}
        onClick={onExpandClick}
        classes={{
          root: classes.root,
        }}
        placeholder="Select university name from list"
        className={className}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <i className={clsx("material-icons", classes.icon)}>school</i>
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

      <div className={classes.menuContainer}>
        {isExpand && (
          <MenuList options={collegeList} onSelectData={onSelectData} />
        )}
      </div>
    </div>
  )
}
UniversitySelector.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  caption: PropTypes.string,
  error: PropTypes.object,
  defaultValue: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  inputRef: PropTypes.func,
}

export default UniversitySelector
