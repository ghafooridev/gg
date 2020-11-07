import React from "react"
import AppBar from "@material-ui/core/AppBar"

import { styles } from "./Footer.Style"

const Footer = function () {
  const classes = styles()

  return (
    <AppBar className={classes.root} position="fixed">
      Footer
    </AppBar>
  )
}

export default Footer
