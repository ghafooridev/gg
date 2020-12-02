import React from "react"

import { Grid, Typography } from "@material-ui/core"

import { styles } from "src/views/Pictionary/Pictionary.Style"

const Waiting = function ({ turn }) {
  const classes = styles()

  return (
    <Grid container className={classes.chooseWordContainer}>
      <Grid className={classes.waitingTitle}>
        <Typography variant="h6">{turn} </Typography>
        <Typography variant="body1"> is selecting a word </Typography>
      </Grid>
    </Grid>
  )
}

export default Waiting
