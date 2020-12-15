import React, { useCallback, useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "../TextField"

import Button from "../Button"

import Card from "../Card"
import Messages from "./Messages"
import clsx from "clsx"
import { styles } from "./ChatBox.Style"

const ChatBox = function ({
  messages,
  fetchMessages,
  onSendClick,
  username,
  title,
  word,
  guessCorrectly,
  className,
  height,
  turn,
}) {
  const classes = styles()
  const [message, setMessage] = useState("")
  const [list, setList] = useState([])

  const onChange = function ({ value }) {
    setMessage(value)
  }

  const onClick = function () {
    if (message) {
      onSendClick(message)
      setMessage("")
    }
  }

  useEffect(() => {
    if (fetchMessages) {
      setList([...fetchMessages])
    }
  }, [fetchMessages])

  useEffect(() => {
    if (
      messages.message &&
      messages.username === turn &&
      messages.message.includes(word)
    ) {
      return setList([
        ...list,
        { username: messages.username, message: "GUESS_BY_TURN_USER" },
      ])
    }

    if (messages.message === word) {
      if (typeof guessCorrectly === "function") {
        guessCorrectly(messages.username)
      }
      return setList([
        ...list,
        { username: messages.username, message: "GUESS_CORRECTLY" },
      ])
    }
    setList([...list, messages])
  }, [messages])

  useEffect(() => {
    return setList([])
  }, [turn])

  return (
    <Card className={clsx(classes.itemCard, className)}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>
      <Grid item xs={12} className={classes.chatBox}>
        <Messages
          messages={list}
          username={username}
          height={height}
          word={word}
        />
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

export default React.memo(ChatBox)
