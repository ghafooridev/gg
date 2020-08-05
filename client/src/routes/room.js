import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

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
    const ref = useRef();

   
    useEffect(() => {
        props.peer.on("stream", stream => {
            console.log("Peer streaming ... ")
            ref.current.srcObject = stream;
        });

        props.peer.on("error", err => {
            console.log("Peer error");
        });

        props.peer.on("close", () => {
            console.log("Peer connection closed");
        });
        // eslint-disable-next-line
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} loop poster="assets/img/FFFFFF-0.png" />
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
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    
    const userVideo = useRef();
    const peersRef = useRef([]);

    const roomID = props.match.params.roomID;

    useEffect(() => {
        socketRef.current = io.connect("/");
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", roomID);
            
            // TODO: set state to joining here

            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
                console.log("peers: ", peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })
                
                const users = [...peers, peer];
                setPeers(users);
                console.log("User added to peers. peers: ", users);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
                console.log("Recieved sent signal: ", payload);
            });

            socketRef.current.on("user disconnect", payload => {
                if (roomID === payload.room) {
                    removePeer(payload.id);
                }
            });
        })

        

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

    // eslint-disable-next-line
    function componentWillUpdate(nextProps, nextState) {
        console.log("state changing to: ", nextState)
        console.log("next props: ", nextProps)
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
                            <Video peer={peer} key={index} />
                            <p>Eric, Univ. of Michigan</p>
                        </StyledVideoContainer>
                    );
                })}
            </StyledVideoWindow>
        </Container>
    );
};

export default Room;