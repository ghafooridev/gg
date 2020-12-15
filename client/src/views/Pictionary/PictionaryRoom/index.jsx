import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import Button from "../../../components/sharedComponents/Button"

import Card from "../../../components/sharedComponents/Card"
import { useHistory } from "react-router-dom"

import RoomTable from "../../../views/Pictionary/PictionaryRoom/RoomTable"
import { socketURL } from "../../../utils/helpers"
import { styles } from "../Pictionary.Style"

const ENDPOINT = socketURL()
let socket

const rooms = [
  { name: "ali", status: "round1", players: 5, capacity: 10 },
  { name: "yyy", status: "round2", players: 4, capacity: 15 },
  { name: "xxx", status: "waiting", players: 3, capacity: 8 },
]
const game="pictionary"
const PictionaryRoom = function (props) {
  const classes = styles()
  const history = useHistory()

  const onCreateRoom = function () {
    history.push({
      pathname: `/${game}-lobby/123`,
    })
  }

  const onJoinRoom = function () {}

  return (
    <Grid container>
      <Grid item xs={8} className={classes.topPanel}>
        <Card className={classes.jumbotron}>
          <Typography variant="h4">47 other players online</Typography>
          <Grid className={classes.roomButtons}>
            <Button
              label="Create A room"
              type="primary"
              onClick={onCreateRoom}
            />
            <Button label="join a room" type="secondary" onClick={onJoinRoom} />
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={8} className={classes.bottomPanel}>
        <Grid item xs={12} className={classes.roomCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Open Rooms
            </Typography>
            <RoomTable rooms={rooms} />
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.roomCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Private Rooms
            </Typography>
            <RoomTable rooms={rooms} />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryRoom
