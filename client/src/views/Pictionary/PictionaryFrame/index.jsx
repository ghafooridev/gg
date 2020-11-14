import React, { useState, useRef, useEffect } from "react"
import CanvasDraw from "react-canvas-draw"
import clsx from "clsx"
import { Grid } from "@material-ui/core"
import { styles } from "./PictionaryFrame.Style"
import ReactDOM from "react-dom"
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

  const onChange = function (x) {
    console.log("x", x)
    console.log(Frame.current.getSaveData())
  }

  useEffect(() => {
    if (Frame && Frame.current) {
      ReactDOM.findDOMNode(Frame.current).addEventListener('mouseup', ()=>{
        console.log(Frame.current.getSaveData())});
    }
  })

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
        onMouseUp={onChange}
        onmouseup={onChange}
        loadTimeOffset={5}
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
//
// import React, { Component } from "react"
// import { v4 } from "uuid"
// import Pusher from "pusher-js"
//
// class Canvas extends Component {
//   constructor(props) {
//     super(props)
//
//     this.onMouseDown = this.onMouseDown.bind(this)
//     this.onMouseMove = this.onMouseMove.bind(this)
//     this.endPaintEvent = this.endPaintEvent.bind(this)
//
//     this.pusher = new Pusher("PUSHER_KEY", {
//       cluster: "eu",
//     })
//   }
//
//   isPainting = false
//
//   userStrokeStyle = "#EE92C2"
//
//   guestStrokeStyle = "#F0C987"
//
//   line = []
//
//   userId = v4()
//
//   prevPos = { offsetX: 0, offsetY: 0 }
//
//   onMouseDown({ nativeEvent }) {
//     const { offsetX, offsetY } = nativeEvent
//     this.isPainting = true
//     this.prevPos = { offsetX, offsetY }
//   }
//
//   onMouseMove({ nativeEvent }) {
//     if (this.isPainting) {
//       const { offsetX, offsetY } = nativeEvent
//       const offSetData = { offsetX, offsetY }
//       this.position = {
//         start: { ...this.prevPos },
//         stop: { ...offSetData },
//       }
//       this.line = this.line.concat(this.position)
//       this.paint(this.prevPos, offSetData, this.userStrokeStyle)
//     }
//   }
//
//   endPaintEvent() {
//     if (this.isPainting) {
//       this.isPainting = false
//       this.sendPaintData()
//     }
//   }
//
//   paint(prevPos, currPos, strokeStyle) {
//     const { offsetX, offsetY } = currPos
//     const { offsetX: x, offsetY: y } = prevPos
//
//     this.ctx.beginPath()
//     this.ctx.strokeStyle = strokeStyle
//     this.ctx.moveTo(x, y)
//     this.ctx.lineTo(offsetX, offsetY)
//     this.ctx.stroke()
//     this.prevPos = { offsetX, offsetY }
//   }
//
//   async sendPaintData() {
//     const body = {
//       line: this.line,
//       userId: this.userId,
//     }
//
//     const req = await fetch("http://localhost:4000/paint", {
//       method: "post",
//       body: JSON.stringify(body),
//       headers: {
//         "content-type": "application/json",
//       },
//     })
//     const res = await req.json()
//     this.line = []
//   }
//
//   componentDidMount() {
//     this.canvas.width = 1000
//     this.canvas.height = 800
//     this.ctx = this.canvas.getContext("2d")
//     this.ctx.lineJoin = "round"
//     this.ctx.lineCap = "round"
//     this.ctx.lineWidth = 5
//
//     const channel = this.pusher.subscribe("painting")
//     channel.bind("draw", (data) => {
//       const { userId, line } = data
//       if (userId !== this.userId) {
//         line.forEach((position) => {
//           this.paint(position.start, position.stop, this.guestStrokeStyle)
//         })
//       }
//     })
//   }
//
//   render() {
//     return (
//       <canvas
//         ref={(ref) => (this.canvas = ref)}
//         style={{ background: "black" }}
//         onMouseDown={this.onMouseDown}
//         onMouseLeave={this.endPaintEvent}
//         onMouseUp={this.endPaintEvent}
//         onMouseMove={this.onMouseMove}
//       />
//     )
//   }
// }
//
// export default Canvas
