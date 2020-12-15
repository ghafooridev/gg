import React, { useEffect, useState } from "react"
import { Grid, Typography } from "@material-ui/core"
import samplesize from "lodash.samplesize"
import { words } from "../../../utils/Words"
import Button from "../../../components/sharedComponents/Button"
import { styles } from "../../../views/Pictionary/Pictionary.Style"

const ChooseWord = function (props) {
  const classes = styles()
  const { onAction, socket, onSelectWordTimesUp, turn } = props
  const [wordArray, setWordArray] = useState([])
  const [counter, setCounter] = useState(20)
  const onSelectWord = function (item) {
    onAction("submit", item)
  }

  useEffect(() => {
    setWordArray(samplesize(words, 3))
    socket.emit("wordSelectTimer.room")
  }, [])

  useEffect(() => {
    socket.on("wordSelectTimerUp.room", () => {
      onSelectWordTimesUp(turn)
      setCounter(0)
    })

    socket.on("wordSelectTimer.room", (wordSelectTimer) => {
      setCounter(wordSelectTimer)
    })

    return () => {
      socket.off("wordSelectTimer.room")
      socket.off("wordSelectTimerUp.room")
    }
  }, [counter])

  return (
    <Grid container className={classes.chooseWordContainer}>
      <Typography variant="h5" className={classes.wordSelectCounter}>
        {counter}
      </Typography>
      {wordArray.map((item, index) => {
        return (
          <Button key={index} label={item} onClick={() => onSelectWord(item)} />
        )
      })}
    </Grid>
  )
}

export default ChooseWord
