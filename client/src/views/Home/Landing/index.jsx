import React from "react"

import { Grid, Typography } from "@material-ui/core"
import GameBox from "src/components/sharedComponents/GameBox"
import Button from "src/components/sharedComponents/Button"
import { styles } from "./Landing.Style"
import Covidopoly from "../../../assets/images/covidopoly.jpg"
import Pictionary from "../../../assets/images/pictionary.jpg"
import ForbiddenIsland from "../../../assets/images/forbiden_island.jpg"
import Mafia from "../../../assets/images/mafia.jpg"

const Landing = function () {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Grid item xs={6} className={classes.title}>
        <Typography variant="h4">
          Play games, socialize, and connect with other Zoom university students
        </Typography>
      </Grid>
      <Button
        label="play now"
        type="primary"
        className={classes.submitButton}
      />
      <Grid item xs={12} className={classes.gameList}>
        <GameBox
          color="primary"
          image={Covidopoly}
          label="Covidopoly"
        />
        <GameBox
          color="warning"
          image={Mafia}
          label="Mafia"
        />
        <GameBox
          color="info"
          image={Pictionary}
          label="Pictionary"
        />
        <GameBox
          color="success"
          image={ForbiddenIsland}
          label="Forbidden Island"
        />
      </Grid>
    </div>
  )
}

export default Landing
