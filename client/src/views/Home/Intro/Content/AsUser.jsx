import React from "react"

import { Grid, Typography } from "@material-ui/core"
import InfoBox from "src/components/sharedComponents/InfoBox"
import { styles } from "../Intro.Style"

const AsUser = function () {
  const classes = styles()

  return (
    <div>
      <Grid container className={classes.root}>
        <Typography variant="h4" className={classes.userInfoTitle}>
          Top Players
        </Typography>
        <Grid item xs={12} className={classes.userInfoPanel}>
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" />
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" />
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" />
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" />
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" />
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" />
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" />
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" />
        </Grid>
        <Typography variant="h4" className={classes.userInfoTitle}>
          Top Playing Schools
        </Typography>
        <Grid item xs={12} className={classes.userInfoPanel}>
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" />
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" />
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" />
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" />
        </Grid>
      </Grid>
    </div>
  )
}

export default AsUser
