import React, {useEffect} from "react"
import { Grid, Typography } from "@material-ui/core"

import Button from "src/components/sharedComponents/Button"

const GameResult = function (props) {
  const { onAction } = props

  return (
    <Grid container xs={12}>
      <Button label="next Round" onClick={onAction} />
    </Grid>
  )
}

export default GameResult
