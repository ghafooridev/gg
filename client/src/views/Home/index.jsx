import React from "react"

import Intro from "src/views/Home/Intro"
import Update from "src/views/Home/Update"
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
