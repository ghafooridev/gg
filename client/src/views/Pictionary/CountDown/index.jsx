import React, { useState, useEffect } from "react"
import { CircularProgress, Typography, Box } from "@material-ui/core"

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h5" component="div">
          {Math.round((props.value * 3) / 5)}
        </Typography>
      </Box>
    </Box>
  )
}

const CountDown = function ({ onTimesUp, isStart }) {
  const [progress, setProgress] = useState(60)

  const onEnd = function () {
    onTimesUp()
  }

  // useEffect(()=>{
  //   if(turn){
  //
  //   }
  // },[turn])

  useEffect(() => {
    if (isStart) {
      const timer = setInterval(() => {

        setProgress((prevProgress) => prevProgress - 1)
        if (progress === -1) {
          clearInterval(timer)
          return onEnd()
        }
      }, 1000)

      return () => {
        clearInterval(timer)
      }
    }
  }, [progress, isStart])

  return (
    <CircularProgressWithLabel
      size={50}
      value={Math.round((progress * 5) / 3)}
    />
  )
}

export default CountDown
