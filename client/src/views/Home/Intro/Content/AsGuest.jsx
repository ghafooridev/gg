import React from "react"

import { Grid, Typography } from "@material-ui/core"
import Button from "src/components/sharedComponents/Button"
import { styles } from "../Intro.Style"
import Gif from "../../../../assets/images/gif2.gif"
import CollegeSlider from "./CallegeSlider"

const AsGuest = function () {
  const classes = styles()

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={6} className={classes.leftPanel}>
          <img alt="animation" src={Gif} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.rightPanel}>
          <Typography variant="h4" className={classes.title}>
            Welcome to GGchat, the new social gaming platform.
          </Typography>
          <Typography
            variant="body2"
            className={classes.subTitle}
            color="textSecondary"
          >
            Play games online with integrated video chat features and a public
            queuing system. Invite your friends or pair up with other Zoom
            university students! Sign up to customize your player profile and be
            the first to try new custom games.
          </Typography>
          <Button label="play now" type="primary" className={classes.button} />
        </Grid>
      </Grid>
      <CollegeSlider />
    </div>
  )
}

export default AsGuest
