import React from "react"

import clsx from "clsx"

import { styles } from "./JoyStick.Style"

const JoyStick = function (props) {
  const { children, className,curveClass } = props
  const classes = styles()

  return (
    <div style={{ position: "relative" }}>
      <div className={clsx(classes.root, className)}>{children}</div>
        <div className={clsx(classes.curve,classes.leftCurve,curveClass)}/>
        <div className={clsx(classes.curve,classes.rightCurve,curveClass)}/>
    </div>
  )
}

export default JoyStick
