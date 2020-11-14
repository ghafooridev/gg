import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

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
              {message.username} :
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
