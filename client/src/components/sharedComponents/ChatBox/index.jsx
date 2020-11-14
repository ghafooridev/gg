import React, { useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

import Card from "src/components/sharedComponents/Card"
import Messages from "src/components/sharedComponents/ChatBox/Messages"
import { styles } from "./ChatBox.Style"

const ChatBox = function ({ messages, onSendClick, username }) {
  const classes = styles()
  const [message, setMessage] = useState("")

  const onChange = function ({ value }) {
    setMessage(value)
  }

  const onClick = function () {
    if (message) {
      onSendClick(message)
      setMessage("")
    }
  }

  return (
    <Card className={classes.itemCard}>
      <Typography variant="h5" className={classes.title}>
        Chat
      </Typography>
      <Grid item xs={12} className={classes.chatBox}>
        <Messages messages={messages} username={username} />
      </Grid>
      <Grid item xs={12} className={classes.chatEntry}>
        <TextField
          defaultValue={message}
          label="Type here ..."
          onChange={onChange}
          onEnter={onClick}
        />
        <Button label="send" onClick={onClick} />
      </Grid>
    </Card>
  )
}

export default ChatBox
