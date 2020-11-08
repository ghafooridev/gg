import React from "react"

import clsx from "clsx"
import { styles } from "./Update.Style"
import Game from "../../../assets/images/game2.jpg"

const Update = function () {
  const classes = styles()

  return (
    <div className="grid">
      <figure className={clsx("effect-sarah", classes.box)}>
        <img
          src={Game}
          alt="update"
        />
        <figcaption>
          <h2>New updates</h2>
          <ul>
            <li>Add Mafia game</li>
            <li>Improve profile section</li>
          </ul>
        </figcaption>
      </figure>
    </div>
  )
}

export default Update
