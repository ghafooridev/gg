import React from "react"

import PropTypes from "prop-types"

import clsx from "clsx"

import { styles } from "./Button.Style"

const Button = function (props) {
  const { label, style, className, onClick, icon, htmlType } = props

  const classes = styles(props)

  const onButtonClick = function (event) {
    if (typeof onClick === "function") {
      onClick(event)
    }
  }

  return (
    <button
      type={htmlType}
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
  htmlType: PropTypes.string,
}

Button.defaultProps = {
  type: "primary",
  htmlType: "button",
}

export default Button
