import React from "react"

import PropTypes from "prop-types"

import clsx from "clsx"

import Button from "src/components/sharedComponents/Button"
import Covidopoly from "../../../assets/images/covidopoly.jpg"
import Pictionary from "../../../assets/images/pictionary.jpg"
import ForbiddenIsland from "../../../assets/images/forbiden_island.jpg"
import Mafia from "../../../assets/images/mafia.jpg"

import { styles } from "./GameBox.Style"

const GameBox = function (props) {
  const classes = styles(props)
  const { label, isUser, type } = props

  const loadGameImage = function () {
    const types = {
      covidopoly: Covidopoly,
      pictionary: Pictionary,
      forbidden: ForbiddenIsland,
      mafia: Mafia,
    }

    if (types[type]) {
      return types[type]
    }
  }

  return (
    <div className={classes.root}>
      <figure className={clsx("snip1104", classes.color, classes.panel)}>
        <img src={loadGameImage()} alt={label} className={classes.image} />
        <figcaption>
          <h2 className={classes.color}>{label}</h2>
        </figcaption>
      </figure>
      {isUser && (
        <Button
          label="play now"
          type="primary"
          className={classes.userPlayButton}
        />
      )}
    </div>
  )
}

GameBox.propTypes = {}

export default GameBox
