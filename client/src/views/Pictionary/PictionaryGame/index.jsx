import React from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import { styles } from "../Pictionary.Style"

import PictionaryFrame from "../PictionaryFrame/Canvas"

const PictionaryGame = function () {
  const classes = styles()

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Typography variant="h2">Pictionary</Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item xs={3} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Players
            </Typography>
            <InfoBox title="Brad" subTitle="UCLA" labels />
            <InfoBox title="john doe" subTitle="oxford university" labels />
            <Button label="leave queue" />
          </Card>
        </Grid>
        <Grid item xs={6} className={classes.pictionaryPanel}>
          <Card className={classes.itemCard}>
            <PictionaryFrame />
          </Card>
        </Grid>
        <Grid item xs={3} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Guess
            </Typography>
            <Grid item xs={12} className={classes.chatBox} />
            <Grid item xs={12} className={classes.chatEntry}>
              <TextField label="Type here ..." />
              <Button label="send" />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryGame
