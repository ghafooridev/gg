import React from "react"

import Header from "../../components/SiteContainer/Header"

import { styles } from "./SiteContainer.Style"

const SiteContainer = function ({ children }) {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Header />
      {children}
      {/*<Footer />*/}
    </div>
  )
}

export default SiteContainer
