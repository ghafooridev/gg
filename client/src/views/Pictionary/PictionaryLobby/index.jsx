import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import TextField from "src/components/sharedComponents/TextField"

import Button from "src/components/sharedComponents/Button"

import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import { useHistory } from "react-router-dom"
import queryString from "query-string"
import io from "socket.io-client"
import ChatBox from "src/components/sharedComponents/ChatBox"
import Constant from "src/utils/Constant"
import chatRepository from "src/repositories/chat"
import { styles } from "../Pictionary.Style"

const ENDPOINT = "localhost:5000"
let socket

const PictionaryLobby = function () {
  const { username, game } = queryString.parse(location.search)

  const classes = styles()
  const history = useHistory()

  const [messages, setMessages] = useState([])
  const [fetchMessages, setFetchMessages] = useState([])
  const [users, setUsers] = useState([])

  const onPlayClick = function () {
    history.push(`pictionary-game?username=${username}&game=${game}`)
  }

  const onSendClick = function (message) {
    socket.emit("chat.lobby", { username, message }, () => {})
  }

  const onLeaveClick = function () {
    socket.emit("leave.lobby", { username, game })
    socket.off()
    history.push("home")
  }

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("join.lobby", { username, game })

    chatRepository.getChatByGame(game).then((chats) => {
      setFetchMessages(chats)
    })

    return () => {
      // socket.emit("leave.lobby", { username, game })
      // socket.off()
    }
  }, [game, username])

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages(message)
    })
  }, [messages])

  useEffect(() => {
    socket.on("users.lobby", (users) => {
      setUsers(users)
    })
  }, [users])

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Card className={classes.jumbotron}>
          <Typography variant="h2">waiting for other players</Typography>
          <Typography variant="h6">
            47 other people playing Pictionary right now
          </Typography>
        </Card>
      </Grid>
      <Button
        label="play"
        className={classes.playButton}
        onClick={onPlayClick}
       // disabled={users.length < Constant.GAMES_CONDITIONS.PICTIONARY_MIN_USER}
      />
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item xs={12} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              PICTIONARY RULES
            </Typography>
            <Typography variant="body1">
              Lorem ipsu dolor sit amet, consectetur adipiscing elit. Nunc
              maximus, nulla ut commodo sagittus, sapien dui mattis dui, non
              pulvinar lorem felis nec erat Lorem ipsu dolor sit amet,
              consectetur adipiscing elit. Nunc maximus, nulla ut commodo
              sagittus, sapien dui mattis dui, non pulvinar lorem felis nec erat
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.middleCol}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              IN QUEUE ({users.length}/
              {Constant.GAMES_CONDITIONS.PICTIONARY_MIN_USER})
            </Typography>
            {users.map((item, index) => {
              return (
                <InfoBox
                  key={index}
                  title={item.username}
                  subTitle={item.university}
                />
              )
            })}
            <Button label="leave queue" onClick={onLeaveClick} />
          </Card>
        </Grid>
        <Grid item xs={12} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              TODAY’S ICEBREAKER
            </Typography>
            <TextField
              rows={4}
              label="What is your favorite cuisine?"
              style={{ marginBottom: 10 }}
            />
            <Button label="submit" />
          </Card>
          <ChatBox
            title="Chat"
            messages={messages}
            fetchMessages={fetchMessages}
            username={username}
            onSendClick={onSendClick}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryLobby
