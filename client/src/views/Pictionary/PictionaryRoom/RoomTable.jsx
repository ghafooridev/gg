import React from "react"

import { Grid, Typography } from "@material-ui/core"

import { styles } from "../Pictionary.Style"

const RoomTable = function ({ rooms }) {
  const classes = styles()

  return (
    <Grid container>
      <Grid item xs={12} className={classes.roomTableRow}>
        <Typography variant="h6">Room Name</Typography>
        <Typography variant="h6">Players</Typography>
      </Grid>
      {rooms.map((item, index) => {
        return (
          <Grid key={index} item xs={12} className={classes.roomTableRow}>
            <Grid>
              <Typography variant="h6" color="primary">
                {item.name}
              </Typography>
              <Typography variant="body2">{item.status}</Typography>
            </Grid>
            <Typography variant="body1">
              {item.players}/{item.capacity}
            </Typography>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default RoomTable
