import React from "react"
import { Grid, Paper, Typography } from "@material-ui/core"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const Clue = function ({ word, username, turn }) {
  const wordArray = word.split("")
  const classes = styles()
  return (
    <Paper className={classes.clue}>
      {wordArray.map((char, index) => {
        return (
          <span key={index}>
            {username === turn && (
              <Typography variant="h5" style={{ opacity: "1" }}>
                {char}
              </Typography>
            )}
            <div className={classes.underline} />
          </span>
        )
      })}
    </Paper>
  )
}

export default Clue
