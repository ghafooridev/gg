import React from "react"

import { Grid, Typography, Paper } from "@material-ui/core"

import GameBox from "src/components/sharedComponents/GameBox"
import Button from "src/components/sharedComponents/Button"
import Card from "src/components/sharedComponents/Card"

import { styles } from "../Landing.Style"

const AsUser = function () {
  const classes = styles()

  return (
    <>
      <Card className={classes.jumbotron}>
        <Grid item xs={12}>
          <Typography variant="h4">Hey xxx !</Typography>
          <Typography variant="h6">
            Welcome back to GGchat. let's play ...
          </Typography>
        </Grid>
        <Button
          label="brows games"
          type="primary"
          className={classes.submitButton}
        />
      </Card>
      <Grid item xs={12} className={classes.title}>
        <Typography variant="h4">Recently Played</Typography>
      </Grid>

      <Grid item xs={12} className={classes.gameList}>
        <GameBox color="primary" label="Covidopoly" type="covidopoly" isUser />
        <GameBox color="warning" label="Mafia" type="mafia" isUser />
        <GameBox color="info" label="Pictionary" type="pictionary" isUser />
        <GameBox
          color="success"
          label="Forbidden Island"
          type="forbidden"
          isUser
        />
      </Grid>
    </>
  )
}

export default AsUser
