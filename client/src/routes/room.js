import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

import GamePageFooter from "../components/Footers/GamePageFooter";

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
    margin-right: 50px;
    background-color: grey;
`;

const StyledVideoWindow = styled.div`
    right: 0;
    display: inline-block;
    width: 28%;
`;

const StyledVideoContainer = styled.div`
    margin: 5px;
    float: left;
`;

const StyledVideo = styled.video`
    height: 220px;
    width: 280px;

    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
`;

const Video = (props) => {
    // const ref = useRef();

   
    // useEffect(() => {
    //     props.peer.on("stream", stream => {
    //         console.log("Peer streaming ... ")
    //         ref.current.srcObject = stream;
    //     });

    //     props.peer.on("error", err => {
    //         console.log("Peer error");
    //     });

    //     props.peer.on("close", () => {
    //         console.log("Peer connection closed");
    //     });
    //     // eslint-disable-next-line
    // }, []);

    return (
        <StyledVideo playsInline autoPlay ref={props.ref} loop poster="assets/img/FFFFFF-0.png" />
    );
}

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

const Room = (props) => {
    let client = {};
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    
    const userVideo = useRef();
    const remoteStream = useRef({});
    const peersRef = useRef([]);

    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
        .then(stream => {
            userVideo.current.srcObject = stream;
            
            // subscribe to room
            socketRef.current.emit("subscribe", roomID);
            
            // peer constructor
            const initPeer = type => {
                let peer = new Peer({
                  initiator: type === "init" ? true : false,
                  stream: stream,
                  trickle: false
                });
                
                peer.on("stream", stream => {
                  console.log("remote stream is running ...")
                  remoteStream.current.srcObject = stream;
                });

                return peer;
            };
            
            // create initiator
            const createHost = () => {
                client.gotAnswer = false;
                let peer = initPeer("init");
                peer.on("signal", data =>  {
                    if(!client.gotAnswer) {
                        socketRef.current.emit("offer", roomID, data);
                    }
                });

                client.peer = peer;
                setPeers([peer]);
            }

            // create remote
            const createRemote = offer => {
                let peer = initPeer("notinit");
                peer.on("signal", data => {
                  socketRef.current.emit("answer", roomID, data);
                });
                peer.signal(offer);
                client.peer = peer;
                setPeers([peer]);
            };

            // handle answer
            const handleAnswer = answer => {
                client.gotAnswer = true;
                let peer = client.peer;
                peer.signal(answer);
            }

            const session_active = () => {
                alert("session active");
            };
            
            //socket events
            socketRef.current.on("create_host", createHost);
            socketRef.current.on("new_offer", createRemote);
            socketRef.current.on("new_answer", handleAnswer);
            // socketRef.current.on("end", end);
            socketRef.current.on("session_active", session_active);

            socketRef.current.on("user disconnect", payload => {
                if (roomID === payload.room) {
                    removePeer(payload.id);
                }
            });
        })
        .catch(error => {
            //error alerts
            console.log(error);
        });
        

        // eslint-disable-next-line
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        }).on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        console.log('Adding a Peer! Returning signal to newly joint user: ',  incomingSignal, callerID);

        return peer;
    }

    function removePeer(peerID) {
        console.log("Removing peer!");
        console.log("peers: ", peers);

        let remove = null;
        const updatedPeers = [];

        peersRef.current.forEach(peerRefObj => {
            console.log(peerRefObj);
            if (peerRefObj.peerID !== peerID) { 
                updatedPeers.push(peerRefObj.peer);
            } else {
                remove = peerRefObj;
            }
        });

        // remove from peerRefObj
        if (remove) {
            const idx = peersRef.current.indexOf(remove);

            if (idx > -1) {
                peersRef.current.splice(idx, 1);
            }
        }

        console.log("peers: ", updatedPeers);
        console.log("peersRef: ", peersRef);
        setPeers(updatedPeers);
    }

    return (
        <Container>
            <StyledGameWindow>
                Hello
            </StyledGameWindow>
            <StyledVideoWindow>
                <StyledVideoContainer>
                    <StyledVideo muted ref={userVideo} autoPlay playsInline loop poster="assets/img/FFFFFF-0.png" />
                    <p>Eric, Univ. of Michigan</p>
                </StyledVideoContainer>
                {peers.map((peer, index) => {
                    return (
                        <StyledVideoContainer key={index}>
                            <StyledVideo ref={remoteStream} muted autoPlay={true} playsInline />
                            {/* <video
                                id="remoteStream"
                                autoPlay={true}
                                muted
                                playsInline
                                ref={remoteStream}
                            ></video> */}
                            <p>Eric, Univ. of Michigan</p>
                        </StyledVideoContainer>
                    );
                })}
            </StyledVideoWindow>

            <GamePageFooter />
        </Container>
    );
};

export default Room;