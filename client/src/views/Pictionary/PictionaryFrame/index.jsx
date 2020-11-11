import React, { useState, useRef } from "react"
import CanvasDraw from "react-canvas-draw"
import clsx from "clsx"
import { Grid } from "@material-ui/core"
import { styles } from "./PictionaryFrame.Style"

const PALETTE = {
  BLACK: "#000",
  YELLOW: "#F2C94C",
  RED: "#E63F3F",
  BLUE: "#3943B7",
  GREEN: "#1EA896",
  PURPLE: "#BB6BD9",
}
const SIZE = {
  LG: 15,
  MD: 10,
  SM: 5,
}

const PictionaryFrame = function () {
  const Frame = useRef(null)
  const [brushColor, setBrushColor] = useState(PALETTE.BLACK)
  const [brushSize, setBrushSize] = useState(SIZE.MD)
  const classes = styles()

  const Point = function ({ size, color, className, onClick }) {
    return (
      <div
        className={clsx(
          className,
          classes.point,
          classes[size],
          (color === brushColor ||
            (size && SIZE[size.toUpperCase()] === brushSize)) &&
            classes.selected
        )}
        style={{ backgroundColor: color || brushColor }}
        onClick={onClick}
      />
    )
  }

  const onClearClick = function () {
    Frame.current.clear()
  }

  const onUndoClick = function () {
    Frame.current.undo()
  }

  const onClickColor = function (pointColor) {
    setBrushColor(pointColor)
  }

  const onClickSize = function (pointSize) {
    setBrushSize(pointSize)
  }

  return (
    <div>
      <CanvasDraw
        ref={Frame}
        hideInterface
        hideGrid
        lazyRadius={0}
        brushRadius={brushSize}
        className={classes.frame}
        brushColor={brushColor}
      />
      <Grid item className={classes.toolbar}>
        <Grid item xs={2} className={classes.item}>
          <Point
            size="sm"
            color={PALETTE.BLACK}
            onClick={() => onClickSize(SIZE.SM)}
          />
          <Point
            size="md"
            color={PALETTE.BLACK}
            onClick={() => onClickSize(SIZE.MD)}
          />
          <Point
            size="lg"
            color={PALETTE.BLACK}
            onClick={() => onClickSize(SIZE.LG)}
          />
        </Grid>
        <Grid item xs={4} className={classes.item}>
          <Point
            className={classes.color}
            color={PALETTE.BLUE}
            onClick={() => onClickColor(PALETTE.BLUE)}
          />
          <Point
            className={classes.color}
            color={PALETTE.YELLOW}
            onClick={() => onClickColor(PALETTE.YELLOW)}
          />
          <Point
            className={classes.color}
            color={PALETTE.GREEN}
            onClick={() => onClickColor(PALETTE.GREEN)}
          />
          <Point
            className={classes.color}
            color={PALETTE.RED}
            onClick={() => onClickColor(PALETTE.RED)}
          />
          <Point
            className={classes.color}
            color={PALETTE.PURPLE}
            onClick={() => onClickColor(PALETTE.PURPLE)}
          />
        </Grid>
        <Grid item xs={2} className={classes.item}>
          <i className="material-icons" onClick={onClearClick}>
            clear
          </i>
          <i className="material-icons" onClick={onUndoClick}>
            refresh
          </i>
        </Grid>
      </Grid>
    </div>
  )
}
export default PictionaryFrame
