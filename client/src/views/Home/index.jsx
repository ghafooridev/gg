import React from "react"

import Intro from "../../views/Home/Intro"
import Update from "../../views/Home/Update"
import Landing from "./Landing"

import { styles } from "./Home.Style"

const Forget = function () {
  const classes = styles()

  return (
    <div>
      <Landing />
      <Intro />
      <Update />
    </div>
  )
}

export default Forget
