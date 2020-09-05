import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

// import GameBrowser from "../components/GameBrowser";
import GamePageFooter from "components/Footers/GamePageFooter";
import Messages from "components/Messages";
import authenticationService from "services/authentication.service";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledGameWindow = styled.div`
    left: 0; 
    width: 68%;
    height: 90%;
    margin-right: 50px;
    background-color: grey;
`;

const StyledVideoWindow = styled.div`
    right: 0;
    display: inline-block;
    width: 28%;
    position: relative;
`;

const StyledVideoContainer = styled.div`
    margin: 5px;
    float: left;
`;

const StyledVideo = styled.video`
    width: 250px;
    height: 185px;

    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
`;

const Video = ({peerStreams, peerID}) => {
    const remoteStream = useRef({});

    useEffect(() => {
        const peerStream = peerStreams.find(p => p.peerID === peerID);
        if (peerStream) {
            remoteStream.current.srcObject = peerStream.stream;
        }
    }, [peerStreams, peerID])

    return (
        <StyledVideo ref={remoteStream} autoPlay={true} loop playsInline poster="assets/img/FFFFFF-0.png" />
    )
};

const videoConstraints = {
    audio: true,
    video: {
        width: {
            min: 320,
            max: 640
        },
        height: {
            min: 240,
            max: 480
        }
    }
};

const gameURLs = {
    "Scribble": "https://skribbl.io/",
    "Out of Context": "https://www.outofcontext.party/",
    "Secret Hitler": "https://secrethitler.io/",
    "Covidopoly": "https://www.covidopoly.io/",
    "Mafia": "https://mafia.gg/"
}

const Room = (props) => {
    console.log(props);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const [peerStreams, setPeerStreams] = useState([]);
    const peerAnswers = useRef({});
    const [muted, setMuted] = useState(false);
    const [messages, setMessages] = useState([]);
    
    const userVideo = useRef();
    const peersRef = useRef([]);

    const roomID = props.match.params.roomID;
    // const user = props.location.state.user;
    // const gameName = props.location.state.gameName;
    const user = authenticationService.currentUserValue;

    const gameName = "Covidopoly"

    useEffect(() => {
        console.log("Running use effect", props);
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
        .then(stream => {
            userVideo.current.srcObject = stream;
            
            // subscribe to room
            socketRef.current.emit("subscribe", {roomId: roomID, userId: user.userId});
            
            // create peers for users already in room
            const processRoomUsers = (users) => {
                console.log("Processing Room users ... ", users);
                const arr = [];
                users.forEach((userID) => {
                    // create peer
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    arr.push(userID);

                    peersRef.current.push({ peerID: userID, peer });
                });
                setPeers(arr);
            }

            // create peer for newly joined user
            const processNewUser = (payload) => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({ peerID: payload.callerID, peer });

                setPeers(peers => [...peers, payload.callerID]);
            }

            // handle answer from peer 
            const processUserAnswer = (payload) => {
                console.log("processing user answer")
                const d = peerAnswers.current;
                d[payload.id] = true;

                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            }

            // handle user disconnect event
            const processUserDisconnect = (payload) => {
                if (roomID === payload.room) {
                    removePeer(payload.id);
                }
            }

            // someone sent a message to the chat room
            const recieveChatMessage = (payload) => {
                console.log("message recieved!")
                setMessages(messages => 
                    [...messages, {message: payload.message, user: payload.sender}]
                );
            }

            //socket events
            socketRef.current.on("room users", processRoomUsers);
            socketRef.current.on("user joined", processNewUser);
            socketRef.current.on("user answer", processUserAnswer);
            socketRef.current.on("user disconnect", processUserDisconnect);
            socketRef.current.on("message notification", recieveChatMessage);
        })
        .catch(error => {
            //error alerts
            console.log(error);
        });
        

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        console.log("state changed: ", peers, peerStreams);
    }, [peers, peerStreams]); 

    function createPeer(userToSignal, callerID, stream) {

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        })

        peer.on("stream", stream => {
            const arr = [...peerStreams, {peerID: userToSignal, stream}];
            setPeerStreams(arr);
        });
        
        const d = peerAnswers.current;
        d[callerID] = false;

        peer.on("signal", signal => {
            const answered = peerAnswers.current;
            if(!answered[callerID]) {
                socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
            }
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("stream", stream => {
            const arr = [...peerStreams, {peerID: callerID, stream}];
            setPeerStreams(arr);
            // console.log(arr);
        });

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    // TODO: update this to new structure
    function removePeer(peerID) {
        // console.log("Removing peer!");
        // console.log("peers: ", peers);

        debugger;
        // remove from peerStreams state
        setPeerStreams(userStreams => 
            userStreams.filter(peerStream => peerStream.peerID !== peerID)
        );

        // remove from peers
        setPeers(peers =>  peers.filter(userID => userID !== peerID));

        // remove from peersRef
        let remove = null;
        const updatedPeers = [];

        peersRef.current.forEach(peerRefObj => {
            console.log(peerRefObj);
            if (peerRefObj.peerID !== peerID) { 
                updatedPeers.push(peerRefObj.peerID);
            } else {
                remove = peerRefObj;
            }
        });

        if (remove) {
            const idx = peersRef.current.indexOf(remove);

            if (idx > -1) {
                peersRef.current.splice(idx, 1);
            }
        }
        
    }

    // send chat message to room
    function sendMessage(message) {
        console.log("send message invoked!", message)
        socketRef.current.emit("user message", {message: message, sender: user.name, id: user.userId, room: true})
    }
    
    // toggle audio
    const toggleAudio = () => {
        console.log("toggle audio called!");
        
        setMuted((muted) => !muted);

        let audioTracks = userVideo.current.srcObject.getAudioTracks();
        for (var i = 0; i < audioTracks.length; ++i) {
            audioTracks[i].enabled = !audioTracks[i].enabled;
        }
    };

    return (
        <Container>
            <StyledGameWindow>
                <iframe width="100%" height="100%" src={gameURLs[gameName]} title="Game Browser" />
            </StyledGameWindow>
            <StyledVideoWindow>
                <StyledVideoContainer>
                    <StyledVideo muted ref={userVideo} autoPlay playsInline loop poster="assets/img/FFFFFF-0.png" />
                    <p>{user.name}, {user.university}</p>
                </StyledVideoContainer>
                {peers.map((peerID, index) => {
                    return (
                        <StyledVideoContainer key={index}>
                            <Video peerID={peerID} peerStreams={peerStreams} muted autoPlay={true} playsInline />
                            <p>Eric, Univ. of Michigan</p>
                        </StyledVideoContainer>
                    );
                })}

                <Messages messages={messages} sendMessage={sendMessage} />
            </StyledVideoWindow>

            <GamePageFooter toggleAudio={toggleAudio} muteText={muted ? 'Unmute' : 'Mute'} />
        </Container>
    );
};

export default Room;