import React, { useEffect } from "react"

import PropTypes from "prop-types"

import { useSelector } from "react-redux"

import AlertReactstrap from "reactstrap/lib/Alert"

import AlertAction from "../../redux/actions/AlertAction"

const Alert = function () {
  const { show, text, type } = useSelector((state) => state.alert)

  const toggle = () => {
    AlertAction.hide()
  }

  useEffect(() => {
    setTimeout(() => {
      if (show) {
        AlertAction.hide()
      }
    }, 5000)
  }, [show])

  return (
    <AlertReactstrap
      className="staticToast rounded"
      color={type}
      isOpen={show}
      toggle={toggle}
    >
      {text}
    </AlertReactstrap>
  )
}

Alert.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "link",
  ]),
}

Alert.defaultProps = {
  type: "primary",
}
export default Alert
