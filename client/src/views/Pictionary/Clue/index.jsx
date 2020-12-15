import React, { useEffect, useState } from "react"
import { Grid, Paper, Typography } from "@material-ui/core"
import { styles } from "src/views/Pictionary/Pictionary.Style"

const Clue = function ({ word, username, turn, charIndex }) {
  const wordArray = word.split("")
  const classes = styles()
  const [showIndex, setShowIndex] = useState()

  useEffect(() => {
    setShowIndex(charIndex)
  }, [charIndex])

  return (
    <Paper className={classes.clue}>
      {wordArray.map((char, index) => {
        return (
          <span key={index}>
            {(username === turn || index === showIndex) && (
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
