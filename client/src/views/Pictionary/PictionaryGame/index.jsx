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
import VideoBox from "src/views/Pictionary/VideoBox"
import Peer from "peerjs"
import ChooseWord from "../ChooseWord"
import { styles } from "../Pictionary.Style"
import PictionaryFrame from "../PictionaryFrame/Canvas"
import Clue from "../Clue"
import CountDown from "../CountDown"
import GameResult from "../GameResult"

const ENDPOINT = "localhost:5000"
let socket
const peers = []
const elements = []
const PictionaryGame = function () {
  const { username, room } = queryString.parse(location.search)
  const classes = styles()
  const history = useHistory()

  const [guess, setGuess] = useState([])
  const [users, setUsers] = useState([])
  const [word, setWord] = useState("")
  const [turn, setTurn] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [removeGuess, setRemoveGuess] = useState(false)
  const [timer, setTimer] = useState(60)
  const [wordSelectTimer, setWordSelectTimer] = useState(10)
  const [charIndex, setCharIndex] = useState(10000)
  const [audio, setAudio] = useState(false)

  const onSendClick = function (message) {
    socket.emit("guess.room", { username, message }, () => {})
  }

  const onLeaveClick = function (id) {
    socket.emit("leave.room", { username, room, id })
    socket.off()
    history.push("/home")
  }

  const onShowChoseWordDialog = function (nextTurn) {
    if (nextTurn === username) {
      dialogAction.show({
        component: <ChooseWord timer={wordSelectTimer} />,
        title: `Choose a word`,
        disableCloseButton: true,
        onAction: (type, data) => {
          if (type === "submit") {
            setIsPlaying(true)
            setWord(data)
            dialogAction.hide()
            socket.emit("wordSelect.room", data)
            socket.emit("timer.room", data)
          }
        },
      })
    }
  }

  const getUserTurn = function (nextTurn) {
    if (users.length) {
      socket.emit("usersTurn.room", nextTurn)
    }
  }

  // const onShowResult = function () {
  //   setShowResult(true)
  //   socket.emit("showResult.room", () => {
  //     dialogAction.show({
  //       component: <GameResult users={users} />,
  //       title: "Result",
  //       size: "sm",
  //       onAction: () => {
  //         dialogAction.hide()
  //         socket.emit("hideResult.room")
  //       },
  //     })
  //   })
  // }
  //
  const onTimesUp = function () {
    // if (room && turn) {
    // setWord("")
    setCharIndex(1000)
    setIsPlaying(false)
    socket.emit("usersUpdate.room", { room, turn })
    socket.emit("guessRemove.room", { room })
    getUserTurn(turn)
    // onShowResult()
    // }
  }

  const checkReloadPage = function () {
    if (history.action === "POP") {
      dialogAction.hide()
      onLeaveClick()
    }
  }

  const guessCorrectly = function (username) {
    socket.emit("usersUpdatePoint.room", { room, username })
    socket.on("usersUpdatePoint.room", (users) => {
      setUsers(users)
    })
  }

  const appendInformation = function (user) {
    const element = document.getElementById(user.id)

    const point = document.createElement("span")
    point.innerHTML = user.point
    point.className = "point"

    const name = document.createElement("span")
    name.innerHTML = user.username
    name.className = "name"

    const school = document.createElement("span")
    school.innerHTML = user.university
    school.className = "school"

    const icons = document.createElement("div")
    icons.className = "icons"

    const close = document.createElement("i")
    close.className = "material-icons"
    close.innerHTML = "clear"
    close.onclick = () => {
      element.remove()
      // stream.getTracks().forEach((track) => track.stop())
      onLeaveClick(user.id)
    }
    const volume = document.createElement("i")
    volume.className = "material-icons"
    volume.innerHTML = "volume_up"
    volume.onclick = () => {
      console.log(audio)
      setAudio(false)
    }

    icons.append(volume)
    icons.append(close)

    element.append(point)
    element.append(name)
    element.append(school)
    element.append(icons)
  }

  function addVideoStream(video, stream, userId) {
    const videoGrid = document.getElementById("video-grid")
    video.srcObject = stream
    // video.muted = true
    video.addEventListener("loadedmetadata", () => {
      video.play()
    })

    const videoBox = document.createElement("div")
    videoBox.className = "videoBox"
    videoBox.id = userId
    videoBox.append(video)

    videoGrid.append(videoBox)
    socket.emit("getInfo.room", userId)
  }

  function connectToNewUser(myPeer, user, stream) {
    const call = myPeer.call(user.id, stream)
    const video = document.createElement("video")
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream, user.id)
    })
    call.on("close", () => {
      video.remove()
    })

    peers[user.id] = call
  }

  useEffect(() => {
    socket = io(ENDPOINT)

    const myPeer = new Peer({ host: "localhost", port: 3001 })

    const myVideo = document.createElement("video")
    // myVideo.muted = true

    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio,
      })
      .then((stream) => {
        addVideoStream(myVideo, stream, myPeer._id)
        myPeer.on("call", (call) => {
          call.answer(stream)
          const video = document.createElement("video")
          call.on("stream", (userVideoStream) => {
            console.log("SSS", call.peer)
            addVideoStream(video, userVideoStream, call.peer)
          })
        })

        socket.on("userConnected.room", (user) => {
          connectToNewUser(myPeer, user, stream)
        })
      })

    myPeer.on("open", (id) => {
      socket.emit("join.room", { username, room, id }, () => {})
    })

    socket.on("userDisConnected.room", (userId) => {
      peers[userId].close()
    })

    checkReloadPage()
  }, [room, username])

  useEffect(() => {
    socket.on("usersTurn.room", (nextTurn) => {
      if (nextTurn !== turn) {
        socket.emit("wordSelectTimer.room")
        onShowChoseWordDialog(nextTurn)
        setTurn(nextTurn)
      }
    })
    console.log("sssx")
    socket.on("wordSelectTimer.room", (wordSelectTimer) => {
      console.log("fffx")
      setWordSelectTimer(wordSelectTimer)
    })

    return () => {
      socket.off("usersTurn.room")
      socket.off("wordSelectTimer.room")
    }
  }, [turn])

  useEffect(() => {
    socket.on("timersUp.room", () => {
      onTimesUp()
      setTimer(60)
    })

    socket.on("charShow.room", (charIndex) => {
      setCharIndex(charIndex)
    })
    return () => {
      socket.off("timersUp.room")
      socket.off("charShow.room")
    }
  }, [timer])

  useEffect(() => {
    socket.on("hideResult.room", () => {
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
    socket.on("wordShow.room", (data) => {
      setWord(data)
    })

    socket.on("timer.room", (timer) => {
      setTimer(timer)
    })
  }, [word])

  useEffect(() => {
    socket.on("guessRemove.room", () => {
      setRemoveGuess(true)
    })
  }, [isPlaying])

  useEffect(() => {
    socket.on("users.room", (newUser, users) => {
      setUsers(users)
      if (!isPlaying) {
        getUserTurn()
      }
    })

    socket.on("getInfo.room", (user) => {
      console.log(user)
      appendInformation(user)
    })

    socket.on("usersUpdate.room", (updatedUsers) => {
      if (updatedUsers) {
        setUsers(updatedUsers)
      }
    })
    return () => {
      socket.off("usersUpdate.room")
    }
  }, [users])

  return (
    <Grid className={classes.root}>
      <Grid item xs={12} className={classes.topPanel}>
        <Typography variant="h2">Pictionary</Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item sm={12} md={4} className={classes.leftColGame}>
          <Card className={classes.itemCard}>
            <Typography variant="h5" className={classes.title}>
              Players
            </Typography>
            <Grid className={classes.videoCard}>
              <div id="video-grid" className={classes.videoGrid} />
            </Grid>
          </Card>
        </Grid>
        <Grid item sm={12} md={5} className={classes.pictionaryPanel}>
          <Card className={classes.itemCard}>
            <Grid item xs={12} className={classes.pictionaryInfo}>
              <CountDown isStart={!!word} timer={timer} />

              <Clue
                word={word}
                username={username}
                turn={turn}
                charIndex={charIndex}
              />
            </Grid>
            <PictionaryFrame username={username} turn={turn} />
          </Card>
        </Grid>
        <Grid item sm={12} md={3} className={classes.rightColGame}>
          <ChatBox
            className={classes.guessBox}
            title="Guess"
            messages={guess}
            username={username}
            onSendClick={onSendClick}
            word={word}
            removeGuess={removeGuess}
            guessCorrectly={guessCorrectly}
            height={370}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryGame
