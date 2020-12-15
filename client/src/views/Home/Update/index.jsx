import React from "react"

import { Grid, Typography } from "@material-ui/core"

import Button from "../../../components/sharedComponents/Button"
import JoyStick from "../../../components/sharedComponents/JoyStick"

import { styles } from "./Update.Style"

const Update = function () {
  const classes = styles()

  return (
    <div>
      <Grid item md={8} sm={12} className={classes.root}>
        <JoyStick>
          <Grid className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            More games and features to come! Our team is hard at work.
          </Typography>
          <Typography
            variant="h6"
            className={classes.subTitle}
          >
            Some things we’re currently working on:
          </Typography>
          <Typography
            variant="h6"
            className={classes.subTitle}
          >
            <ul>
              <li>Integrating social networks</li>
              <li> Incorporating new custom games</li>
              <li>Building profile customization options</li>
              <li>Personality endorsements</li>
            </ul>
          </Typography>
          <Typography
            variant="h6"
            className={classes.subTitle}
          >
            Have a suggestion for a new feature or game? Found a bug or have other concerns? <a rel="noopener" href="#">Contact us!</a>
          </Typography>
            <Button label="contact Us" type="primary" className={classes.button} />
          </Grid>
        </JoyStick>
      </Grid>
    </div>
  )
}

export default Update
