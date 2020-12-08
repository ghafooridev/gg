import React, { useEffect, useState } from "react"

import { Grid, Typography } from "@material-ui/core"

import clsx from "clsx"

import io from "socket.io-client"

import queryString from "query-string"

import { useHistory } from "react-router-dom"

import Card from "src/components/sharedComponents/Card"
import ChatBox from "src/components/sharedComponents/ChatBox"

import Peer from "peerjs"
import SimplePeer from "simple-peer"
import { socketURL } from "src/helpers/utils"
import Storage from "src/services/Storage"
import Constant from "src/utils/Constant"
import Button from "src/components/sharedComponents/Button"
import dialogAction from "src/redux/actions/dialogAction"
import ChooseWord from "../ChooseWord"
import { styles } from "../Pictionary.Style"
import PictionaryFrame from "../PictionaryFrame/Canvas"
import Clue from "../Clue"
import CountDown from "../CountDown"
import Waiting from "../Waiting"

const ENDPOINT = socketURL()
let socket
const peers = []
let callList = []
let localStream = null;

const PictionaryGame = function (props) {
  // const { username, room } = queryString.parse(location.search)
  const { username, room } = props.location.state
  const classes = styles()
  const history = useHistory()

  const [guess, setGuess] = useState([])
  const [users, setUsers] = useState([])
  const [word, setWord] = useState("")
  const [turn, setTurn] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [timer, setTimer] = useState(60)
  const [charIndex, setCharIndex] = useState(10000)
  const [audio, setAudio] = useState(true)
  const [videos, setVideo] = useState(true)
  const [guessedUser, setGuessedUser] = useState([])
  const [round, setRound] = useState(0)
  const [myStream, setMyStream] = useState(null)

  const onSendClick = function (message) {
    socket.emit("guess.room", { username, message }, () => {})
  }

  const onLeaveClick = function (id) {
    socket.emit("leave.room", { username, room, id })
    if (id) {
      callList = callList.filter((item) => item === id)
      removeCurrentWrapper(id)
    }
    socket.off()
    history.push("/home")
  }

  const onLeftClick = function () {
    const currentUser = Storage.pull(Constant.STORAGE.CURRENT_USER).username
    const element = document.querySelectorAll(
      `[data-username=${currentUser}]`
    )[0]
    const id = element.id
    myStream && myStream.getTracks().forEach((track) => track.stop())
    onLeaveClick(id)
  }

  const onVideoClick = function () {
    myStream &&
      myStream.getTracks().forEach(function (track) {
        if (track.readyState === "live" && track.kind === "video") {
          setVideo(!videos)
          track.enabled = !track.enabled
        }
      })
  }

  const onAudioClick = function () {
    myStream &&
      myStream.getTracks().forEach(function (track) {
        if (track.readyState === "live" && track.kind === "audio") {
          setAudio(!audio)
          track.enabled = !track.enabled
        }
      })
  }

  const getUserTurn = function (nextTurn) {
    if (users && users.length) {
      socket.emit("usersTurn.room", { room, nextTurn })
    }
  }

  const onSelectWordTimesUp = function (turn) {
    dialogAction.hide()
    setCharIndex(1000)
    socket.emit("usersUpdate.room", { room, turn })
    getUserTurn(turn)
  }

  const onShowChoseWordDialog = function (isPlaying, nextTurn) {
    if (!isPlaying) {
      if (nextTurn === username) {
        return dialogAction.show({
          component: (
            <ChooseWord
              socket={socket}
              onSelectWordTimesUp={onSelectWordTimesUp}
              turn={nextTurn}
            />
          ),
          title: `Choose a word`,
          disableCloseButton: true,
          onAction: (type, data) => {
            if (type === "submit") {
              setWord(data)
              dialogAction.hide()
              socket.emit("wordSelect.room", data)
              socket.emit("timer.room", {word:data,nextTurn})
            }
          },
        })
      }

      return dialogAction.show({
        component: <Waiting turn={nextTurn} />,
        size: "sm",
        title: `Please Wait ... `,
        disableCloseButton: true,
      })
    }
  }

  const onShowResult = function () {
    setShowResult(true)
    socket.emit("showResult.room", { room })
  }

  const onTimesUp = function () {
    setWord("")
    setCharIndex(1000)
    socket.emit("usersUpdate.room", { room, turn })
    onShowResult()
  }

  const checkReloadPage = function () {
    if (history.action === "POP") {
      dialogAction.hide()
      onLeaveClick()
    }
  }

  const guessCorrectly = function (username) {
    if (!guessedUser.includes(username)) {
      setGuessedUser([...guessedUser, username])
    }
  }

  const removeCurrentWrapper = function (id) {
    const element = document.getElementById(id)
    const wrapperClass = element.getElementsByClassName("wrapper")
    if (wrapperClass && wrapperClass[0]) {
      wrapperClass[0].remove()
    }

    return element
  }

  const appendInformation = function (user) {
    const element = removeCurrentWrapper(user.socketId)
    element.setAttribute("data-username", user.username)

    const point = document.createElement("span")
    point.innerHTML = user.point
    point.className = "point"

    const name = document.createElement("span")
    name.innerHTML = user.username
    name.className = "name"

    const school = document.createElement("span")
    school.innerHTML = user.university
    school.className = "school"

    const wrapper = document.createElement("div")
    wrapper.className = "wrapper"

    wrapper.append(point)
    wrapper.append(name)
    wrapper.append(school)
    element.append(wrapper)
  }

  const onDetectTurnedUser = function (turnedUser) {
    const element = document.querySelectorAll(
      `[data-username=${turnedUser}]`
    )[0]
    const videoGrid = document.getElementById("video-grid")
    videoGrid.querySelectorAll(".draw").forEach((el) => el.remove())

    const draw = document.createElement("i")
    draw.innerHTML = "edit"
    draw.className = "material-icons draw"

    element.append(draw)
  }

  const addVideoStream = function (video, stream, userId) {
    const videoGrid = document.getElementById("video-grid")
    video.srcObject = stream
    video.addEventListener("loadedmetadata", () => {
      video.play()
    })

    const videoBox = document.createElement("div")
    videoBox.className = "videoBox"
    videoBox.style.height = `${window.innerHeight - 600}px`
    videoBox.id = userId
    videoBox.append(video)

    videoGrid.append(videoBox)
    socket.emit("getInfo.room", userId)
  }

  const connectToNewUser = function (myPeer, user, stream) {
    const call = myPeer.call(user.socketId, stream)
    const video = document.createElement("video")
    call.on("stream", (userVideoStream) => {
      if (!callList[call.peer]) {
        addVideoStream(video, userVideoStream, user.socketId)
        callList[call.peer] = call
      }
    })
    call.on("close", () => {
      video.remove()
    })

    peers[user.socketId] = call
  }


  function removePeer(socket_id) {

    let videoEl = document.getElementById(socket_id)
    if (videoEl) {

      const tracks = videoEl.srcObject.getTracks();

      tracks.forEach(function (track) {
        track.stop()
      })

      videoEl.srcObject = null
      videoEl.parentNode.removeChild(videoEl)
    }
    if (peers[socket_id]) peers[socket_id].destroy()
    delete peers[socket_id]
  }

  function addPeer(socket_id, am_initiator) {
    peers[socket_id] = new SimplePeer({
      initiator: am_initiator,
      stream: localStream,
      //config: configuration
    })

    peers[socket_id].on('signal', data => {
      socket.emit('signal', {
        signal: data,
        socket_id: socket_id
      })
    })

    peers[socket_id].on('stream', stream => {
      let newVid = document.createElement('video')
      newVid.srcObject = stream
      newVid.id = socket_id
      newVid.playsinline = false
      newVid.autoplay = true
      newVid.className = "vid"
      const videos=document.getElementById('xxx')
      videos.appendChild(newVid)
    })
  }

  const initP2P=function() {
    socket = io(ENDPOINT)
    socket.on('initReceive', socket_id => {
      addPeer(socket_id, false)
      socket.emit('initSend', socket_id)
    })


    socket.on('initSend', socket_id => {
      addPeer(socket_id, true)
    })

    socket.on('removePeer', socket_id => {
      console.log('removing peer ' + socket_id)
      removePeer(socket_id)
    })

    socket.on('disconnect', () => {
      console.log('GOT DISCONNECTED')
      for (let socket_id in peers) {
        removePeer(socket_id)
      }
    })

    socket.on('signal', data => {
      peers[data.socket_id].signal(data.signal)
    })
  }



  useEffect(() => {
    socket = io(ENDPOINT)

    // const myPeer = new Peer({ host: "localhost", port: 3001 })
    //
    // const myVideo = document.createElement("video")
    //
    // navigator.mediaDevices
    //   .getUserMedia({
    //     video: true,
    //     audio: true,
    //   })
    //   .then((stream) => {
    //     setMyStream(stream)
    //     addVideoStream(myVideo, stream, myPeer._id)
    //     myPeer.on("call", (call) => {
    //       call.answer(stream)
    //       const video = document.createElement("video")
    //       call.on("stream", (userVideoStream) => {
    //         if (!callList[call.peer]) {
    //           addVideoStream(video, userVideoStream, call.peer)
    //           callList[call.peer] = call
    //         }
    //       })
    //     })
    //
    //     socket.on("userConnected.room", (user) => {
    //       connectToNewUser(myPeer, user, stream)
    //     })
    //   })
    //
    // myPeer.on("open", (id) => {
    //   socket.emit("join.room", { username, room, id }, () => {})
    // })







    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        const myVideo = document.getElementById("localVideo")
        myVideo.srcObject = stream;
        localStream = stream;
        initP2P()
      })






    socket.on("userDisConnected.room", ({ userId }) => {
      const element = document.getElementById(userId)
      element.remove()
      peers[userId].close()
    })

    socket.on("showResult.room", (users) => {
      setUsers(users)
      users.map((item) => socket.emit("getInfo.room", item.socketId))
      socket.emit("hideResult.room")
    })

    window.addEventListener("beforeunload", () => {
      onLeftClick()
    })

    checkReloadPage()

    return () => {
      socket.off("disconnect")
    }
  }, [room, username])

  useEffect(() => {
    if (guessedUser.length && guessedUser.length === users.length - 1) {
      socket.emit("guessAllCorrectly.room", () => {})
    }
  }, [guessedUser])

  useEffect(() => {
    socket.on("usersTurn.room", ({ isPlaying, nextTurn }) => {
      if (nextTurn !== turn) {
        onShowChoseWordDialog(isPlaying, nextTurn)
        setTurn(nextTurn)
      }
    })

    return () => {
      socket.off("usersTurn.room")
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
      setShowResult(false)
      getUserTurn(turn)
    })

    socket.emit("usersUpdatePoint.room", { room, round, guessedUser })
    socket.on("usersUpdatePoint.room", (users) => {
      setUsers(users)
    })

    return () => {
      socket.off("hideResult.room")
      socket.off("usersUpdatePoint.room")
    }
  }, [showResult])

  useEffect(() => {
    socket.on("guess", (guess) => {
      setGuess(guess)
    })

    socket.on("message.game", (message) => {
      setGuess(message)
    })

    return () => {
      socket.off("message.game")
    }
  }, [guess])

  useEffect(() => {
    socket.on("wordShow.room", ({ word, round }) => {
      dialogAction.hide()
      setWord(word)
      setRound(round)
      setGuessedUser([])
    })

    socket.on("timer.room", ({ timer, word, turnedUser }) => {
      onDetectTurnedUser(turnedUser)
      setWord(word)
      setTimer(timer)
    })
  }, [word])

  useEffect(() => {
    socket.on("users.room", (isplaying, newUser, users) => {
      setUsers(users)
      if (
        users.length === Constant.GAMES_CONDITIONS.PICTIONARY_USER &&
        !isPlaying
      ) {
        getUserTurn()
      }
    })

    socket.on("getInfo.room", (user) => {
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
      <video id="localVideo" className="vid" autoPlay muted></video>
      <div id='xxx'>

      </div>
      <Grid item xs={12} className={classes.topPanel}>
        <Typography variant="h2">Pictionary</Typography>
      </Grid>
      <Grid item xs={12} className={classes.bottomPanel}>
        <Grid item sm={12} md={4} className={classes.leftColGame}>
          <Card className={classes.itemCard}>
            <Grid className={classes.videoHeader}>
              <Typography variant="h5">Players</Typography>
              <Grid>
                <Button
                  className={classes.videoHeaderButton}
                  icon={<i className="material-icons">exit_to_app</i>}
                  onClick={onLeftClick}
                />
                <Button
                  className={classes.videoHeaderButton}
                  icon={
                    <i className="material-icons">
                      {videos ? "videocam" : "videocam_off"}
                    </i>
                  }
                  onClick={onVideoClick}
                />
                <Button
                  className={classes.videoHeaderButton}
                  icon={
                    <i className="material-icons">
                      {audio ? "volume_up" : "volume_off"}
                    </i>
                  }
                  onClick={onAudioClick}
                />
              </Grid>
            </Grid>
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
            <PictionaryFrame
              username={username}
              turn={turn}
              height={window.innerHeight - 350}
            />
          </Card>
        </Grid>
        <Grid item sm={12} md={3} className={classes.rightColGame}>
          <Card
            className={clsx(classes.itemCard, classes.resultTableContainer)}
          >
            <Grid className={classes.videoHeader}>
              <Typography variant="h5">Result</Typography>
              <Typography variant="h6">Round {round}</Typography>
            </Grid>
            {users &&
              users
                .sort((a, b) => b.point - a.point)
                .map((item, index) => {
                  return (
                    <Grid key={index} className={classes.resultTableRow}>
                      <Typography variant="subtitle1">
                        {item.username}
                      </Typography>
                      <Typography variant="subtitle1">{item.point}</Typography>
                    </Grid>
                  )
                })}
          </Card>
          <ChatBox
            className={classes.guessBox}
            title="Guess"
            messages={guess}
            username={username}
            onSendClick={onSendClick}
            word={word}
            guessCorrectly={guessCorrectly}
            turn={turn}
            height={window.innerHeight - 650}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PictionaryGame
