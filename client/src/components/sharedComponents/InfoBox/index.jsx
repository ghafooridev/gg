import React from "react"

import { Grid, Paper, Typography } from "@material-ui/core"

import clsx from "clsx"

import Chip from "src/components/sharedComponents/Chip"
import { styles } from "./InfoBox.Style"
import Gif from "../../../assets/images/p.png"

const InfoBox = function (props) {
  const { labels, gameCount, point, title, subTitle, className ,turn} = props
  const classes = styles(props)

  return (
    <Paper className={clsx(classes.root, className)}>
      <Grid item xs={12} className={classes.top}>
        <Grid item xs={2} className={classes.topLeft}>
          <img alt="image" src={Gif} />
        </Grid>
        <Grid item xs={10} className={classes.topRight}>
          <Grid item xs={12} className={classes.topRightUP}>
            <Typography variant="h6" className={classes.subTitle}>
              {title}
            </Typography>
            {point && (
              <Typography
                variant="body2"
                className={classes.subTitle}
                color="error"
              >
                {point}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className={classes.topRightDown}>
            <Typography variant="caption" className={classes.subTitle}>
              {subTitle}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.down}>
        {gameCount && (
          <div className={classes.downText}>
            <i className={clsx("material-icons", classes.icon)}>
              sports_esports
            </i>
            <Typography
              variant="body2"
              className={classes.subTitle}
              color="textSecondary"
            >
              {gameCount} games
            </Typography>
          </div>
        )}
        {labels && (
          <div className={classes.downChips}>
            <Chip label="Basic" color="primary" />
          </div>
        )}
      </Grid>
    </Paper>
  )
}

export default InfoBox
