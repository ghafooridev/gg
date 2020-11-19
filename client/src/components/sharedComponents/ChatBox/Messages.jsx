import React from "react"

import clsx from "clsx"

import { Typography } from "@material-ui/core"

import ScrollToBottom from "react-scroll-to-bottom"

import { styles } from "./ChatBox.Style"

const Messages = function ({ messages, username }) {
  const classes = styles()
  return (
    <ScrollToBottom className={classes.scroll}>
      {messages.map((message, index) => {
        return (
          message.message && (
            <div
              key={index}
              className={clsx(
                message.message === "GUESS_CORRECTLY" && classes.guessed,
                classes.message
              )}
            >
              <Typography
                variant="body1"
                color={
                  message.username === username ? "primary" : "textPrimary"
                }
              >
                {message.username === username ? "Me" : message.username} :
              </Typography>
              <Typography variant="body2" color="textSecondary" className={classes.chatContent}>
                {message.message === "GUESS_CORRECTLY"
                  ? "Guessed the word correctly"
                  : message.message}
              </Typography>
            </div>
          )
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages
