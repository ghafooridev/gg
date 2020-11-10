import React from "react"

import { Grid, Typography } from "@material-ui/core"
import GameBox from "src/components/sharedComponents/GameBox"
import Button from "src/components/sharedComponents/Button"
import { styles } from "../Landing.Style"

const AsGuest = function () {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Grid item sm={6} xs={12} className={classes.title}>
        <Typography variant="h2">
          Play games, socialize, and connect with other Zoom university students
        </Typography>
      </Grid>
      <Button
        label="play now"
        type="primary"
        className={classes.submitButton}
      />
      <Grid item xs={12} className={classes.gameList}>
        <GameBox color="primary" label="Covidopoly" type="covidopoly" />
        <GameBox color="warning" label="Mafia" type="mafia" />
        <GameBox color="info" label="Pictionary" type="pictionary" />
        <GameBox color="success" label="Forbidden Island" type="forbidden" />
      </Grid>
    </div>
  )
}

export default AsGuest
