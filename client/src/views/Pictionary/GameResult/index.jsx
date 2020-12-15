import React from "react"
import { Grid, Typography } from "@material-ui/core"

import Button from "src/components/sharedComponents/Button"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const GameResult = function (props) {
  const { onAction, users, round } = props
  const classes = styles()

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.wordSelectCounter}>
          Round : {round}
        </Typography>
        <Grid item xs={12} className={classes.resultTableRow}>
          <Typography variant="h6">Players</Typography>
          <Typography variant="h6">Points</Typography>
        </Grid>
        <Grid item xs={12} className={classes.resultTableContainer}>
          {users &&
            users.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  className={classes.resultTableRow}
                >
                  <Typography variant="subtitle1"> {item.username}</Typography>
                  <Typography variant="subtitle1"> {item.point}</Typography>
                </Grid>
              )
            })}
        </Grid>
      </Grid>
      <Grid className={classes.resultButton}>
        <Button label="next Round" onClick={onAction} />
      </Grid>
    </Grid>
  )
}

export default GameResult
