import React, { useEffect } from "react"

import PropTypes from "prop-types"

import clsx from "clsx"

import { styles } from "./Button.Style"

const Button = function (props) {
  const { label, style, className, onClick, icon } = props

  const classes = styles(props)

  const onButtonClick = function (event) {
    if (typeof onClick === "function") {
      onClick(event)
    }
  }

  return (
    <button
      type="button"
      onClick={onButtonClick}
      style={style}
      className={clsx(classes.root, className)}
    >
      <span>
        {icon}
        {label}
      </span>
    </button>
  )
}

Button.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  className: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  color: "primary",
}

export default Button
