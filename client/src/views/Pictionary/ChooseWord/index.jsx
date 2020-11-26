import React, {useEffect, useState} from "react"
import { Grid, Typography } from "@material-ui/core"
import samplesize from "lodash.samplesize"
import { words } from "src/utils/Words"
import Button from "src/components/sharedComponents/Button"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const ChooseWord = function (props) {
  const classes = styles()
  const { onAction, timer } = props
  const [wordArray,setWordArray]=useState([])
  const [counter,setCounter]=useState(timer)
  const onSelectWord = function (item) {
    onAction("submit", item)
  }

  useEffect(() => {
    setWordArray(samplesize(words, 3))
  }, [])

  useEffect(() => {
    setCounter(timer)
  }, [timer])
  console.log(counter,timer)
  return (
    <Grid container xs={12} className={classes.chooseWordContainer}>
      <Typography>{counter}</Typography>
      {wordArray.map((item, index) => {
        return (
          <Button key={index} label={item} onClick={() => onSelectWord(item)} />
        )
      })}
    </Grid>
  )
}

export default ChooseWord
