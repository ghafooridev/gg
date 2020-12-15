import React from "react"

import { useSelector } from "react-redux"

import isEmpty from "lodash.isempty"

import AsGuest from "../../../views/Home/Intro/Content/AsGuest"
import AsUser from "../../../views/Home/Intro/Content/AsUser"
import { styles } from "./Intro.Style"

const Intro = function () {
  const currentUser = useSelector((state) => state.user)

  const classes = styles()

  return (
    <div className={classes.root}>
      {isEmpty(currentUser) ? <AsGuest /> : <AsUser />}
    </div>
  )
}

export default Intro
