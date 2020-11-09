import React from "react"

import AsGuest from "src/views/Home/Landing/Content/AsGuest"
import { useSelector } from "react-redux"
import isEmpty from "lodash.isempty"
import AsUser from "src/views/Home/Landing/Content/AsUser"
import { styles } from "./Landing.Style"

const Landing = function () {
  const currentUser = useSelector((state) => state.user)

  const classes = styles()

  return (
    <div className={classes.root}>
      {isEmpty(currentUser) ? <AsGuest /> : <AsUser />}
    </div>
  )
}

export default Landing
