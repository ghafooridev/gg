import React, { Component, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import { Grid } from "@material-ui/core"
import io from "socket.io-client"
import { styles } from "./PictionaryFrame.Style"
import pen from "../../../assets/images/pen.png"
import erase from "../../../assets/images/eraser.png"

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
let socket

const ENDPOINT = "localhost:5000"

const Canvas = function ({ username, turn }) {
  const classes = styles()
  const canvas = useRef(null)
  let ctx
  let brushColor = PALETTE.BLACK
  let brushSize = SIZE.MD
  let isPainting = false

  let line = []
  let prevPos = { offsetX: 0, offsetY: 0 }
  const onClickColor = function (pointColor) {
    brushColor = pointColor
  }

  const isMyTurn = function () {
    return username === turn
  }

  const onClickSize = function (pointSize) {
    brushSize = pointSize
  }

  const onClearClick = function () {
    ctx = canvas.current.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, 600, 500)
    const options = {
      line: [],
      clear: true,
    }

    socket.emit("paint.game", options, () => {
      line = []
    })
  }

  const onUndoClick = function () {
    brushColor = "#fff"
  }

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

  const onMouseDown = function ({ nativeEvent }) {
    if (isMyTurn()) {
      const { offsetX, offsetY } = nativeEvent
      isPainting = true
      prevPos = { offsetX, offsetY }
    }
  }

  const paint = function (prePos, currPos, style) {
    const { offsetX, offsetY } = currPos
    const { offsetX: x, offsetY: y } = prePos

    ctx.beginPath()
    ctx.strokeStyle = style.color
    ctx.lineWidth = style.size
    ctx.moveTo(x, y)
    ctx.lineTo(offsetX, offsetY)
    ctx.stroke()
    prevPos = { offsetX, offsetY }
  }

  const onMouseMove = function ({ nativeEvent }) {
    if (isPainting) {
      const { offsetX, offsetY } = nativeEvent
      const offSetData = { offsetX, offsetY }
      const position = {
        start: { ...prevPos },
        stop: { ...offSetData },
      }
      line = line.concat(position)
      paint(prevPos, offSetData, { color: brushColor, size: brushSize })
    }
  }

  const sendPaintData = function () {
    const options = {
      line,
      color: brushColor,
      size: brushSize,
      username,
      clear: false,
    }
    socket.emit("paint.game", options, () => {
      line = []
    })
  }

  const endPaintEvent = function () {
    if (isPainting) {
      isPainting = false
      sendPaintData()
    }
  }

  const createCanvas = function () {
    canvas.current.width = 600
    canvas.current.height = 500
    ctx = canvas.current.getContext("2d")
    ctx.lineJoin = "round"
    ctx.lineCap = "round"
  }

  useEffect(() => {
    createCanvas()

    socket = io(ENDPOINT)

    socket.on("draw", (options) => {
      const { username, line, color, size, clear } = options
      // if (username !== this.username) {
      line.forEach((position) => {
        paint(position.start, position.stop, { color, size })
      })

      if (clear) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, 600, 500)
      }
      //  }
    })
  }, [line])

  return (
    <div>
      <canvas
        ref={canvas}
        style={{
          background: "#fff",
          cursor: isMyTurn() ? `url('${pen}') 0 30, auto` : "not-allowed",
        }}
        onMouseDown={onMouseDown}
        onMouseLeave={endPaintEvent}
        onMouseUp={endPaintEvent}
        onMouseMove={onMouseMove}
      />
      {isMyTurn() && (
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
            <i className="material-icons" onClick={onUndoClick}>
              image_aspect_ratio
            </i>
            <i className="material-icons" onClick={onClearClick}>
              clear
            </i>
          </Grid>
        </Grid>
      )}
    </div>
  )
}

export default React.memo(Canvas)
