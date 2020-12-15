import React from "react"

import { Grid, Typography } from "@material-ui/core"
import InfoBox from "../../../../components/sharedComponents/InfoBox"
import { styles } from "../Intro.Style"

const AsUser = function () {
  const classes = styles()

  return (
    <div>
      <Grid container className={classes.container}>
        <Typography variant="h4" className={classes.userInfoTitle}>
          Top Players
        </Typography>
        <Grid item xs={12} className={classes.userInfoPanel}>
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" className={classes.infoBox}/>
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" className={classes.infoBox}/>
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" className={classes.infoBox}/>
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" className={classes.infoBox}/>
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" className={classes.infoBox}/>
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" className={classes.infoBox}/>
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" className={classes.infoBox}/>
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" className={classes.infoBox}/>
        </Grid>
        <Typography variant="h4" className={classes.userInfoTitle}>
          Top Playing Schools
        </Typography>
        <Grid item xs={12} className={classes.userInfoPanel}>
          <InfoBox gameCount={1234} title="john Doe" subTitle="ucla" className={classes.infoBox} />
          <InfoBox gameCount={54} title="nick lovely" subTitle="hawaii" className={classes.infoBox} />
          <InfoBox gameCount={895} title="summy beg" subTitle="oxford" className={classes.infoBox} />
          <InfoBox gameCount={1011} title="ali ghafoori" subTitle="cambridge" className={classes.infoBox} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AsUser
