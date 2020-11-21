import React from "react"

import { Grid, Typography } from "@material-ui/core"
import GameBox from "src/components/sharedComponents/GameBox"
import Button from "src/components/sharedComponents/Button"
import Constant from "src/utils/Constant"
import { styles } from "../Landing.Style"

const AsGuest = function () {
  const classes = styles()

  return (
    <div className={classes.root}>
      <Grid item sm={6} xs={12} className={classes.title}>
        <Typography variant="h3">
          Play games, socialize, and connect with other Zoom university
          students. Sign up for an account and start playing today!
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
          label="Covidopoly"
          type={Constant.ENUMS.GAMES.COVIDOPOLY}
        />
        <GameBox
          color="warning"
          label="Mafia"
          type={Constant.ENUMS.GAMES.MAFIA}
        />
        <GameBox
          color="info"
          label="Pictionary"
          type={Constant.ENUMS.GAMES.PICTIONARY}
        />
        <GameBox
          color="success"
          label="Forbidden Island"
          type={Constant.ENUMS.GAMES.FORBIDDEN_ISLAND}
        />
      </Grid>
    </div>
  )
}

export default AsGuest
