import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';
import io from "socket.io-client";
import qs from 'qs';

const StyledVideo = styled.video`
    border-radius-top-left: 10px;
    border-radius-top-right: 10px;

    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
`;

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

const Lobby = (props) => {
    const history = useHistory();
    const userVideo = useRef();
    const socketRef = useRef();
    const [joiningGame, setJoiningGame] = useState(false);

    const user = {
        "name": "Armin Jamshidi",
        "university": "UC San Diego",
        "description": "Chess-enthusiast, Masters Student, Extrovert"
    }

    const styleObj = {
        "width": "25rem",
        "margin": "5px"
    }

    const centerStyle = {
        "display": "inline-flex",
        "width": "100%",
        "marginTop": "10%",
        "padding": "10px"
    }

    const videoDivStyle = {
        "overflow": "hidden",
        "borderRadius": "10px 10px 0 0"
    }

    useEffect(() => {
        const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
        const gameName = params.gameName;

        socketRef.current = io.connect("/");
        socketRef.current.emit("user queue", {user: user, gameName: gameName});

        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
        .then(stream => {
            try {
                userVideo.current.srcObject = stream;
                console.log("updating usevideo ref");
            } catch(err) {
                console.error(err);
            }
        });

        const handleGameFound = payload => {
            setJoiningGame(true);
            const roomId = payload.roomId;
            console.log("Redirecting to game room. user = ", user, gameName);
            history.push("/room/" + roomId, {user: user, gameName: gameName});
        }

        //socket events
        socketRef.current.on("game found", handleGameFound);        
    }, 
    // eslint-disable-next-line
    []);

    return (
        <div>
            <h1 style={{"textAlign": "center"}}>
                {joiningGame ? "Joining game ..." : "Matching with other players ..."}
            </h1>
            <center style={centerStyle}>
                <div className="card" style={styleObj}>
                    <img className="card-img-top" src={require("assets/img/image cap.svg")} alt="Card cap" />
                    <div className="card-body">
                        <p className="card-text"><b>Player 1</b><br></br>
                        <i>UCLA</i></p>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card" style={styleObj}>
                    <img className="card-img-top" src={require("assets/img/image cap.svg")} alt="Card cap" />
                    <div className="card-body">
                        <p className="card-text"><b>Player 2</b><br></br>
                        <i>Stanford University</i></p>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card" style={styleObj}>
                    <div style={videoDivStyle}>
                        <StyledVideo className="card-img-top" ref={userVideo} autoPlay={true} muted loop playsInline poster="assets/img/FFFFFF-0.png" /> 
                    </div>
                    <div className="card-body">
                    <p className="card-text"><b>{user.name}</b><br></br>
                        <i>{user.university}</i></p>
                        <p className="card-text">{user.description}</p>
                    </div>
                </div>
                <div className="card" style={styleObj}>
                    <img className="card-img-top" src={require("assets/img/image cap.svg")} alt="Card cap" />
                    <div className="card-body">
                        <p className="card-text"><b>Player 4</b><br></br>
                        <i>University of Michigan</i></p>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card" style={styleObj}>
                    <img className="card-img-top" src={require("assets/img/image cap.svg")} alt="Card cap" />
                    <div className="card-body">
                        <p className="card-text"><b>Player 5</b><br></br>
                        <i>UC Berkley</i></p>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default Lobby;