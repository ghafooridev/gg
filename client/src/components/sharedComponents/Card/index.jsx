import React from "react"

import { Paper } from "@material-ui/core"

import { styles } from "./Card.Style"

const Card = function (props) {
  const { children, className } = props
  const classes = styles()

  return (
    <Paper className={className} classes={{ root: classes.root }}>
      {children}
    </Paper>
  )
}

export default Card
