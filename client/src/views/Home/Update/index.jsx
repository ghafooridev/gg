import React from "react"

import { Grid, Typography } from "@material-ui/core"
import Button from "src/components/sharedComponents/Button"
import { styles } from "./Update.Style"
import Gif from "../../../assets/images/gif2.gif"
import UpdateBox from "src/views/Home/Update/UpdateBox";

const Update = function () {
  const classes = styles()

  return (
    <div>
      <Grid container className={classes.root}>

        <Grid item xs={12} sm={6} className={classes.leftPanel}>
          <Typography variant="h4" className={classes.title}>
            More games and features to come! Our team is hard at work.
          </Typography>
          <Typography
            variant="body2"
            className={classes.subTitle}
            color="textSecondary"
          >
            Some things we’re currently working on:
          </Typography>
          <Typography
            variant="body2"
            className={classes.subTitle}
            color="textSecondary"
          >
            <ul>
              <li>Integrating social networks</li>
              <li> Incorporating new custom games</li>
              <li>Building profile customization options</li>
              <li>Personality endorsements</li>
            </ul>
          </Typography>
          <Typography
            variant="body2"
            className={classes.subTitle}
            color="textSecondary"
          >
            Have a suggestion for a new feature or game? Found a bug or have other concerns? Contact us!
          </Typography>
          <Button label="contact Us" type="primary" className={classes.button} />
        </Grid>
        <Grid item xs={12} sm={6} className={classes.rightPanel}>
         <UpdateBox/>
          <UpdateBox/>
          <UpdateBox/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Update
