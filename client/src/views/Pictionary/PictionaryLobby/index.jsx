import React from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import { useHistory } from "react-router-dom"
import { styles } from "../Pictionary.Style"

const PictionaryLobby = function () {
  const classes = styles()
  const history = useHistory()

  const onPlayClick = function () {
    history.push("pictionary-game?123")
  }

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Card className={classes.jumbotron}>
          <Typography variant="h2">waiting for other players</Typography>
          <Typography variant="h6">
            47 other people playing Pictionary right now
          </Typography>
        </Card>
      </Grid>
      <Button
        label="play"
        className={classes.playButton}
        onClick={onPlayClick}
      />
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item xs={12} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              PICTIONARY RULES
            </Typography>
            <Typography variant="body1">
              Lorem ipsu dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittus, sapien dui mattis dui, non
              pulvinar lorem felis nec erat Lorem ipsu dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittus, sapien dui mattis dui, non pulvinar lorem felis nec erat
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.middleCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              IN QUEUE (2/3)
            </Typography>
            <InfoBox title="Brad" subTitle="UCLA" labels />
            <InfoBox title="john doe" subTitle="oxford university" labels />
            <Button label="leave queue" />
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              TODAY’S ICEBREAKER
            </Typography>
            <TextField
              rows={4}
              label="What is your favorite cuisine?"
              style={{ marginBottom: 10 }}
            />
            <Button label="submit" />
          </Card>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Chat
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

export default PictionaryLobby
