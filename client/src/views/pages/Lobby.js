import React, { useEffect, useRef } from 'react';
import styled from "styled-components";

const StyledVideo = styled.video`
    height: 220px;
    width: 280px;

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

function Lobby () {
    const userVideo = useRef({});

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
        "border-radius": "10px 10px 0 0"
    }

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
        .then(stream => {
            userVideo.current.srcObject = stream;
        })
    }, []);

    return (
        <div>
            <h1 style={{"textAlign": "center"}}>Matching with other players ...</h1>
            <center style={centerStyle}>
                <div class="card" style={styleObj}>
                    <img class="card-img-top" src={require("assets/img/image cap.svg")} alt="Card image cap" />
                    <div class="card-body">
                        <p class="card-text"><b>Player 1</b><br></br>
                        <i>UCLA</i></p>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card" style={styleObj}>
                    <img class="card-img-top" src={require("assets/img/image cap.svg")} alt="Card image cap" />
                    <div class="card-body">
                        <p class="card-text"><b>Player 2</b><br></br>
                        <i>Stanford University</i></p>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card" style={styleObj}>
                    <div style={videoDivStyle}>
                        <StyledVideo class="card-img-top" ref={userVideo} autoPlay={true} muted loop playsInline poster="assets/img/FFFFFF-0.png" /> 
                    </div>
                    <div class="card-body">
                    <p class="card-text"><b>Armin Jamshidi</b><br></br>
                        <i>UCSD</i></p>
                        <p class="card-text">Chess-enthusiast, Masters Student, Extrovert</p>
                    </div>
                </div>
                <div class="card" style={styleObj}>
                    <img class="card-img-top" src={require("assets/img/image cap.svg")} alt="Card image cap" />
                    <div class="card-body">
                        <p class="card-text"><b>Player 4</b><br></br>
                        <i>University of Michigan</i></p>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div class="card" style={styleObj}>
                    <img class="card-img-top" src={require("assets/img/image cap.svg")} alt="Card image cap" />
                    <div class="card-body">
                        <p class="card-text"><b>Player 5</b><br></br>
                        <i>UC Berkley</i></p>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </center>
        </div>
    )
}

export default Lobby;