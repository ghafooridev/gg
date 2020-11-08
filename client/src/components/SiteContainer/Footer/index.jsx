import React from "react"
import AppBar from "@material-ui/core/AppBar"

import { styles } from "./Footer.Style"

const Footer = function () {
  const classes = styles()

  return (
    <AppBar className={classes.root}>
      <span className="copyright">
        © {new Date().getFullYear()}, made by GG chat Team
      </span>
    </AppBar>
  )
}

export default Footer
