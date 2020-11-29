import React, { useEffect } from "react"
import { Grid, Typography } from "@material-ui/core"

import Button from "src/components/sharedComponents/Button"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const GameResult = function (props) {
  const { onAction, users } = props
  const classes = styles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid item xs={12} className={classes.resultTableRow}>
          <Typography variant="h5">Players</Typography>
          <Typography variant="h5">Points</Typography>
        </Grid>
        <Grid item xs={12} className={classes.resultTableContainer}>
          {users &&
            users.map((user, index) => {
              return (
                <Grid key={index} item xs={12} className={classes.resultTableRow}>
                  <Typography variant="h5"> {user.username}</Typography>
                  <Typography variant="h5"> {user.point}</Typography>
                </Grid>
              )
            })}
        </Grid>
      </Grid>
      <Button label="next Round" onClick={onAction} />
    </Grid>
  )
}

export default GameResult
