import React from "react"

import { Grid, Typography, Paper } from "@material-ui/core"

import GameBox from "src/components/sharedComponents/GameBox"
import Button from "src/components/sharedComponents/Button"
import Card from "src/components/sharedComponents/Card"

import Constant from "src/utils/Constant"
import { styles } from "../Landing.Style"

const AsUser = function (props) {
  const classes = styles()
  const { user } = props

  return (
    <>
      <Card className={classes.jumbotron}>
        <Grid item xs={12}>
          <Typography variant="h3">
            Hey {user.name} ! Welcome back to GGchat. let's play ...
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
        <GameBox
          color="primary"
          label="Covidopoly"
          type={Constant.ENUMS.GAMES.COVIDOPOLY}
          user={user}
        />
        <GameBox
          color="warning"
          label="Mafia"
          type={Constant.ENUMS.GAMES.MAFIA}
          user={user}
        />
        <GameBox
          color="info"
          label="Pictionary"
          type={Constant.ENUMS.GAMES.PICTIONARY}
          user={user}
        />
        <GameBox
          color="success"
          label="Forbidden Island"
          type={Constant.ENUMS.GAMES.FORBIDDEN_ISLAND}
          user={user}
        />
      </Grid>
    </>
  )
}

export default AsUser
