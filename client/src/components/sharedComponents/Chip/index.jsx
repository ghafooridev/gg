import React from "react"

import MuiChip from "@material-ui/core/Chip"

import { styles } from "./Chip.Style"

const Chip = function (props) {
  const { className, label, color } = props
  const classes = styles()

  return (
    <MuiChip
      className={className}
      classes={{ root: classes.root }}
      label={label}
      color={color}
    />
  )
}

export default Chip
