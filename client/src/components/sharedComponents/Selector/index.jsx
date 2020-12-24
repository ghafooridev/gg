import React, { useState } from "react";

import MuiTextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import PropTypes from "prop-types";

import clsx from "clsx";

import MenuItem from "@material-ui/core/MenuItem";

import { styles } from "./Selector.Style";

const Selector = function (props) {
  const classes = styles();
  const {
    name,
    inputRef,
    label,
    style,
    className,
    caption,
    error,
    icon,
    options,
    placeholder,
  } = props;

  const [list, setList] = useState(options);
  const [selectedData, setSelectedData] = useState(null);
  const [isExpand, setIsExpand] = useState(false);

  const onSelectChange = function (event) {
    const { value } = event.target;

    setSelectedData(value);

    if (value) {
      const filteredList = options.filter((item) => {
        return item.toLowerCase().startsWith(value.toLowerCase());
      });
      setIsExpand(true);
      return setList(filteredList);
    }
    setIsExpand(false);
    setList([]);
  };

  const onSelectData = function (item) {
    setSelectedData(item);
    setList([]);
    setIsExpand(false);
  };

  const loadItems = function () {
    return list.map((item, index) => {
      return (
        <MenuItem key={index} value={item} onClick={() => onSelectData(item)}>
          {item}
        </MenuItem>
      );
    });
  };

  const onExpandClick = function () {
    if (isExpand) {
      setList([]);
      setIsExpand(false);
    } else {
      setList(options);
      setIsExpand(true);
    }
  };

  const onBlur = function () {
    if (!options.includes(selectedData)) {
      setSelectedData("");
    }
  };
  //aria-invalid={errors.firstName ? "true" : "false"}

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
        value={selectedData}
        classes={{
          root: classes.root,
        }}
        onChange={onSelectChange}
        placeholder={placeholder}
        className={className}
        onBlur={onBlur}
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

      {isExpand && <div className={classes.menuContainer}>{loadItems()}</div>}
    </div>
  );
};

Selector.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  caption: PropTypes.string,
  error: PropTypes.object,
  icon: PropTypes.string,
  defaultValue: PropTypes.shape({
    text: PropTypes.string,
    value: PropTypes.string,
  }),
  inputRef: PropTypes.func,
  options: PropTypes.array,
};

export default Selector;
