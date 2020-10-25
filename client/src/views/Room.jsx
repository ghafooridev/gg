import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"
import Peer from "simple-peer"
import PropTypes from "prop-types"

// import GameBrowser from "../components/GameBrowser";
import GamePageFooter from "../components/Footers/GamePageFooter"
import Messages from "../components/Messages"
import authenticationService from "../services/authentication.service"
import config from "../config"
import { USER_COLORS } from "../constants"
import getRandomInt from "../helpers/math"

const Video = ({ peerStreams, peerID }) => {
  const remoteStream = useRef({})

  useEffect(() => {
    const peerStream = peerStreams.find((p) => p.peerID === peerID)
    if (peerStream) {
      remoteStream.current.srcObject = peerStream.stream
    }
  }, [peerStreams, peerID])

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className="room__video"
      ref={remoteStream}
      autoPlay
      loop
      playsInline
      poster="assets/img/FFFFFF-0.png"
    />
  )
}

Video.propTypes = {
  peerStreams: PropTypes.arrayOf(PropTypes.shape).isRequired,
  peerID: PropTypes.string.isRequired,
}

const videoConstraints = {
  audio: true,
  video: {
    width: {
      min: 320,
      max: 640,
    },
    height: {
      min: 240,
      max: 480,
    },
  },
}

const gameURLs = {
  Scribble: "https://skribbl.io/",
  "Out of Context": "https://www.outofcontext.party/",
  Drawasaurus: "https://skribbl.io/",
  Covidopoly: "https://www.covidopoly.io/",
  Mafia: "https://mafia.gg/",
}

const Room = ({ match, location }) => {
  const [peers, setPeers] = useState([])
  const socketRef = useRef()

  const [peerStreams, setPeerStreams] = useState([])
  const peerAnswers = useRef({})

  const [peerUserMap, setPeerUserMap] = useState({})
  const [userObjMap, setUserObjMap] = useState({})

  const [muted, setMuted] = useState(false)
  const [messages, setMessages] = useState([])

  const userVideo = useRef()
  const peersRef = useRef([])

  const roomID = match.params.roomID
  const [gameName, setGameName] = useState()
  const user = authenticationService.currentUserValue

  const [joiningWithLink, setJoiningWithLink] = useState(false)
  const [linkUrl, setLinkUrl] = useState("")

  const [randomColor, setRandColor] = useState(
    USER_COLORS[getRandomInt(USER_COLORS.length)]
  )

  useEffect(() => {
    if (location.state && location.state.gameName) {
      setGameName(location.state.gameName)
    } else {
      const requestOptions = { method: "GET" }
      fetch(`${config.apiUrl}/room/gameName?roomId=${roomID}`, requestOptions)
        .then((res) => res.json())
        .then((resJson) => setGameName(resJson.gameName))
    }

    // get rand color for this user
    setRandColor(USER_COLORS[getRandomInt(USER_COLORS.length)])
  }, [location.state, roomID])

  useEffect(() => {
    console.log("Running use effect")
    socketRef.current = io.connect("/")
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        userVideo.current.srcObject = stream

        // subscribe to room
        socketRef.current.emit("subscribe", {
          roomId: roomID,
          userId: user._id,
        })

        // create peers for users already in room
        const processRoomUsers = (users) => {
          console.log("Processing Room users ... ", users)
          const arr = []
          users.forEach((userID) => {
            // create peer
            const peer = createPeer(userID, socketRef.current.id, stream)
            arr.push(userID)

            peersRef.current.push({ peerID: userID, peer })
          })
          setPeers(arr)
        }

        // create peer for newly joined user
        const processNewUser = (payload) => {
          const peer = addPeer(payload.signal, payload.callerID, stream)
          peersRef.current.push({ peerID: payload.callerID, peer })

          setPeers((peers) => [...peers, payload.callerID])

          // add new user id
          setPeerUserMap((mapObj) => ({
            ...mapObj,
            [payload.callerID]: payload.userId,
          }))
        }

        // handle answer from peer
        const processUserAnswer = (payload) => {
          console.log("processing user answer")
          const d = peerAnswers.current
          d[payload.id] = true

          const item = peersRef.current.find((p) => p.peerID === payload.id)
          item.peer.signal(payload.signal)

          setPeerUserMap((curPeerUserMap) => ({
            ...curPeerUserMap,
            [payload.id]: payload.userId,
          }))
        }

        // handle user disconnect event
        const processUserDisconnect = (payload) => {
          console.log("USER DISCONNNECTED!", payload)
          if (roomID === payload.room) {
            removePeer(payload.socketId, payload.id)
          }
        }

        // someone sent a message to the chat room
        const recieveChatMessage = (payload) => {
          console.log("message recieved!")
          setMessages((curMessages) => [
            ...curMessages,
            {
              message: payload.message,
              user: payload.sender,
              color: payload.color,
            },
          ])
        }

        // socket events
        socketRef.current.on("room users", processRoomUsers)
        socketRef.current.on("user joined", processNewUser)
        socketRef.current.on("user answer", processUserAnswer)
        socketRef.current.on("user disconnect", processUserDisconnect)
        socketRef.current.on("message notification", recieveChatMessage)
      })
      .catch((error) => {
        // error alerts
        console.log(error)
      })

    const stopVideo = () => {
      if (userVideo.current && userVideo.current.srcObject) {
        console.log(
          "Stopping video!!!",
          userVideo.current.srcObject.getTracks()
        )
        userVideo.current.srcObject.getTracks().forEach((track) => {
          track.stop()
          // eslint-disable-next-line no-param-reassign
          track.enabled = false
        })

        userVideo.current.srcObject = null
      }
    }

    return () => {
      stopVideo()
      socketRef.current.disconnect()
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("state changed: ", peers, peerStreams)
  }, [peers, peerStreams])

  useEffect(() => {
    console.log("peerUserMap changed: ", peerUserMap)
  }, [peerUserMap])

  useEffect(() => {
    Object.values(peerUserMap).forEach((userId) => {
      console.log(userId)
      const requestOptions = { method: "GET" }
      fetch(`${config.apiUrl}/user/getInfo?userId=${userId}`, requestOptions)
        .then((res) => res.json())
        .then((resJson) => {
          setUserObjMap((curUserObjMap) => ({
            ...curUserObjMap,
            [userId]: resJson,
          }))
        })
    })
  }, [peerUserMap])

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on("stream", (streamObj) => {
      const arr = [...peerStreams, { peerID: userToSignal, streamObj }]
      setPeerStreams(arr)
    })

    const d = peerAnswers.current
    d[callerID] = false

    peer.on("signal", (signal) => {
      const answered = peerAnswers.current
      if (!answered[callerID]) {
        socketRef.current.emit("sending signal", {
          userToSignal,
          callerID,
          signal,
          userId: user._id, // the user object id
        })
      }
    })

    return peer
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("stream", (streamObj) => {
      const arr = [...peerStreams, { peerID: callerID, streamObj }]
      setPeerStreams(arr)
      // console.log(arr);
    })

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", {
        signal,
        callerID,
        userId: user._id,
      })
    })

    peer.signal(incomingSignal)

    return peer
  }

  // TODO: update this to new structure
  function removePeer(peerID, userId) {
    console.log("REMOVING THE PEER!")

    // remove from peerStreams state
    setPeerStreams((userStreams) =>
      userStreams.filter((peerStream) => peerStream.peerID !== peerID)
    )

    // remove from peers
    setPeers((curPeers) => curPeers.filter((userID) => userID !== peerID))

    // remove from peersRef
    let remove = null
    const updatedPeers = []

    peersRef.current.forEach((peerRefObj) => {
      console.log(peerRefObj)
      if (peerRefObj.peerID !== peerID) {
        updatedPeers.push(peerRefObj.peerID)
      } else {
        remove = peerRefObj
      }
    })

    if (remove) {
      const idx = peersRef.current.indexOf(remove)

      if (idx > -1) {
        peersRef.current.splice(idx, 1)
      }
    }
  }

  // send chat message to room
  function sendMessage(message) {
    console.log("send message invoked!", message)
    socketRef.current.emit("user message", {
      message,
      sender: user.name,
      id: user._id,
      room: true,
      color: randomColor,
    })
  }

  // toggle audio
  const toggleAudio = () => {
    console.log("toggle audio called!")

    setMuted((curMuted) => !curMuted)

    const audioTracks = userVideo.current.srcObject.getAudioTracks()
    for (let i = 0; i < audioTracks.length; i += 1) {
      audioTracks[i].enabled = !audioTracks[i].enabled
    }
  }

  const linkSubmitted = (url) => {
    console.log("Link submitted! url = ", url)
    setJoiningWithLink(true)
    setLinkUrl(url)
  }

  return (
    <div className="room__container">
      <div className="room__game-window">
        <iframe
          width="100%"
          height="100%"
          src={joiningWithLink ? linkUrl : gameURLs[gameName]}
          title="Game Browser"
        />
        <GamePageFooter
          toggleAudio={toggleAudio}
          muteText={muted ? "Unmute" : "Mute"}
          linkSubmitted={linkSubmitted}
        />
      </div>
      <div className="room__sidebar">
        <div className="room__vid-window">
          <div className="room__vid-container">
            <video
              className="room__video"
              muted
              ref={userVideo}
              autoPlay
              playsInline
              loop
              poster="assets/img/FFFFFF-0.png"
            />
            <p>
              {user.name} ({user.university})
            </p>
          </div>
          {peers.map((peerID, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div className="room__vid-container" key={index}>
                <Video
                  peerID={peerID}
                  peerStreams={peerStreams}
                  muted
                  autoPlay
                  playsInline
                />
                {userObjMap[peerUserMap[peerID]] ? (
                  <p>
                    {userObjMap[peerUserMap[peerID]].name} (
                    {userObjMap[peerUserMap[peerID]].university})
                  </p>
                ) : (
                  <></>
                )}
              </div>
            )
          })}
        </div>

        <Messages messages={messages} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

Room.propTypes = {
  match: PropTypes.shape,
  location: PropTypes.shape,
}

Room.defaultProps = {
  match: "",
  location: { state: {} },
}

export default Room
