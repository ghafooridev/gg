import React, {useEffect, useState} from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import queryString from "query-string"
import { styles } from "../Pictionary.Style"

import PictionaryFrame from "../PictionaryFrame/Canvas"
import io from "socket.io-client";
import chatRepository from "src/repositories/chat";
import {useHistory} from "react-router-dom";



const ENDPOINT = "localhost:5000"
let socket
const PictionaryGame = function () {
  const { username, game } = queryString.parse(location.search)
  const classes = styles()
  const history = useHistory()

  const [users, setUsers] = useState([])

  const onLeaveClick = function () {
    socket.emit("leave.game", { username, game })
    socket.off()
    history.push("home")
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("join.game", { username, game })

    return () => {
      socket.emit("disconnect")
      socket.off()
    }
  }, [game, username])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Typography variant="h2">Pictionary</Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item sm={12} md={3} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Players
            </Typography>
            <InfoBox title="Brad" subTitle="UCLA" labels />
            <InfoBox title="john doe" subTitle="oxford university" labels />
            <Button label="leave queue" onClick={onLeaveClick}/>
          </Card>
        </Grid>
        <Grid item sm={12} md={6} className={classes.pictionaryPanel}>
          <Card className={classes.itemCard}>
            <PictionaryFrame username={username} game={game} />
          </Card>
        </Grid>
        <Grid item sm={12} md={3} className={classes.col}>
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
