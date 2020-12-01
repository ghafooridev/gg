import React, { useEffect, useState } from "react"
import { Grid, Typography } from "@material-ui/core"

import Button from "src/components/sharedComponents/Button"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const GameResult = function (props) {
  const { onAction, users, round, guessedUser } = props
  const classes = styles()

  const [user, setUser] = useState([])

  useEffect(() => {
    const updateUsers =
      users &&
      users.map((user) => {
        if (guessedUser && guessedUser.includes(user.username)) {
          user.point += 5
          return user
        }
        return user
      })

    setUser([...updateUsers])
  }, [])

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Round : {round}</Typography>
        <Grid item xs={12} className={classes.resultTableRow}>
          <Typography variant="h5">Players</Typography>
          <Typography variant="h5">Points</Typography>
        </Grid>
        <Grid item xs={12} className={classes.resultTableContainer}>
          {user &&
            user.map((item, index) => {
              return (
                <Grid
                  key={index}
                  item
                  xs={12}
                  className={classes.resultTableRow}
                >
                  <Typography variant="h5"> {item.username}</Typography>
                  <Typography variant="h5"> {item.point}</Typography>
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
