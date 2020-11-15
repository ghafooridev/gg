import React from "react"

import { Typography } from "@material-ui/core"

import ScrollToBottom from "react-scroll-to-bottom"

import { styles } from "./ChatBox.Style"

const Messages = function ({ messages, username }) {
  const classes = styles()

  return (
    <ScrollToBottom>
      {messages.map((message, index) => {
        return (
          <div key={index} className={classes.message}>
            <Typography
              variant="subtitle2"
              color={message.username === username ? "primary" : "textPrimary"}
            >
              {message.username === username ? "Me" : message.username} :
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {message.message}
            </Typography>
          </div>
        )
      })}
    </ScrollToBottom>
  )
}

export default Messages
