import React  from "react"

import PropTypes from "prop-types"

import clsx from "clsx"

import { styles } from "./GameBox.Style"

const GameBox = function (props) {
  const classes = styles(props)
  const { label, image } = props
  return (
    <div>
      <figure
        className={clsx("snip1104", classes.color,classes.panel)}
        onClick={() => {
          alert("x")
        }}
      >
        <img src={image} alt={label} className={classes.image}/>
        <figcaption>
          <h2 className={classes.color}>{label}</h2>
        </figcaption>
      </figure>
    </div>
  )
}

GameBox.propTypes = {}

export default GameBox
