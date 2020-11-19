import React from "react"
import { Grid, Typography } from "@material-ui/core"
import samplesize from "lodash.samplesize"
import { words } from "src/utils/Words"
import Button from "src/components/sharedComponents/Button"
import {styles} from "src/views/Pictionary/Pictionary.Style";

const ChooseWord = function (props) {
  const classes = styles()
  const { onAction } = props

  const onSelectWord = function (item) {
    onAction("submit", item)
  }

  return (
    <Grid container xs={12} className={classes.chooseWordContainer}>
      {samplesize(words, 3).map((item, index) => {
        return (
          <Button key={index} label={item} onClick={() => onSelectWord(item)} />
        )
      })}
    </Grid>
  )
}

export default ChooseWord
