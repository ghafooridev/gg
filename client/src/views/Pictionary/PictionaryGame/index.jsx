import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import io from "socket.io-client"

import queryString from "query-string"

import { useHistory } from "react-router-dom"

import Button from "src/components/sharedComponents/Button"
import Card from "src/components/sharedComponents/Card"
import InfoBox from "src/components/sharedComponents/InfoBox"
import ChatBox from "src/components/sharedComponents/ChatBox"

import dialogAction from "src/redux/actions/dialogAction"
import Register from "src/views/Register"
import userRepository from "src/repositories/user"
import AlertAction from "src/redux/actions/AlertAction"
import ChooseWord from "../ChooseWord"
import { styles } from "../Pictionary.Style"
import PictionaryFrame from "../PictionaryFrame/Canvas"
import Clue from "../Clue"
import CountDown from "../CountDown"
import GameResult from "../GameResult"

const ENDPOINT = "localhost:5000"
let socket

const PictionaryGame = function () {
  const { username, game } = queryString.parse(location.search)
  const classes = styles()
  const history = useHistory()

  const [guess, setGuess] = useState([])
  const [users, setUsers] = useState([])
  const [word, setWord] = useState("")
  const [turn, setTurn] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const onSendClick = function (message) {
    socket.emit("guess.game", { username, message }, () => {})
  }

  const onLeaveClick = function () {
    socket.emit("leave.game", { username, game })
    socket.off()
    history.push("home")
  }

  const onShowChoseWordDialog = function () {
    if (turn === username) {
      dialogAction.show({
        component: <ChooseWord />,
        title: "Choose a word",
        onAction: (type, data) => {
          if (type === "submit") {
            setIsPlaying(true)
            setWord(data)
            dialogAction.hide()
            socket.emit("wordSelect.game", data)
          }
        },
      })
    }
  }

  const getUserTurn = function () {
    if (users.length) {
      socket.emit("usersTurn.game", () => {})
    }
  }

  const onShowResult = function () {
    setShowResult(true)
    socket.emit("showResult.game", () => {
      dialogAction.show({
        component: <GameResult />,
        title: "Result",
        onAction: () => {
          dialogAction.hide()
          socket.emit("hideResult.game")
        },
      })
    })
  }

  const onTimesUp = function () {
    setWord("")
    setIsPlaying(false)
    socket.emit("usersUpdate.game", { game, turn })
    onShowResult()
  }

  useEffect(() => {
    onShowChoseWordDialog(turn)
  }, [turn])

  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("join.game", { username, game })

    // return () => {
    //   socket.emit("leave.game", { username, game })
    //   socket.off()
    // }
  }, [game, username])

  useEffect(() => {
    socket.on("hideResult.game", () => {
      dialogAction.hide()
      setShowResult(false)
      getUserTurn()
    })
  }, [showResult])

  useEffect(() => {
    socket.on("guess", (guess) => {
      setGuess(guess)
    })
  }, [guess])

  useEffect(() => {
    socket.on("users.game", (users) => {
      setUsers(users)

      if (!isPlaying) {
        getUserTurn()
      }
    })
    socket.on("usersTurn.game", (turn) => {
      setTurn(turn)
    })
    socket.on("usersUpdate.game", (users) => {
      setUsers(users)
    })
  }, [users])

  useEffect(() => {
    socket.on("wordShow.game", (data) => {
      setWord(data)
    })
    socket.on("showResult.game", () => {
      dialogAction.show({
        component: <GameResult />,
        title: "Result",
        onAction: () => {
          getUserTurn()
        },
      })
    })
  }, [word])
  console.log("x")
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Typography variant="h2">Pictionary</Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item sm={12} md={3} className={classes.col}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Players
            </Typography>
            {users.map((item, index) => {
              return (
                <InfoBox
                  key={index}
                  title={item.username}
                  subTitle={item.university}
                  point={`${item.NOP}${item.username === turn && "*"}`}
                />
              )
            })}
            <Button label="leave queue" onClick={onLeaveClick} />
          </Card>
        </Grid>
        <Grid item sm={12} md={6} className={classes.pictionaryPanel}>
          <Card className={classes.itemCard}>
            <Grid item xs={12} className={classes.pictionaryInfo}>
              {username === turn && (
                <CountDown onTimesUp={onTimesUp} isStart={!!word} />
              )}
              <Clue word={word} username={username} turn={turn} />
            </Grid>
            <PictionaryFrame username={username} turn={turn} />
          </Card>
        </Grid>
        <Grid item sm={12} md={3} className={classes.pictionaryPanel}>
          <ChatBox
            title="Guess"
            messages={guess}
            username={username}
            onSendClick={onSendClick}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryGame
