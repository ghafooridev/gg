import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

const videoConstraints = {
  audio: true,
  width: {
    min: 320,
    max: 640,
  },
  height: {
    min: 240,
    max: 480,
  },
};

const StyledVideo = styled.video`
  border-radius-top-left: 10px;
  border-radius-top-right: 10px;

  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
`;

const UserCard = ({ updateQueue, user, gameName, lobbyId }) => {
  const userVideo = useRef();
  const socketRef = useRef();
  const history = useHistory();
  const [joiningGame, setJoiningGame] = useState(false);

  useEffect(
    () => {
      socketRef.current = io.connect('/');
      socketRef.current.emit('user queue', {
        userId: user._id,
        lobbyId: lobbyId,
        gameName: gameName,
      });

      navigator.mediaDevices
        .getUserMedia({ video: videoConstraints, audio: true })
        .then((stream) => {
          try {
            userVideo.current.srcObject = stream;
            console.log('updating usevideo ref');
          } catch (err) {
            console.error(err);
          }
        });

      const handleGameFound = (payload) => {
        setJoiningGame(true);
        const roomId = payload.roomId;
        // console.log('Redirecting to game room. user = ', user, gameName);
        // history.push('/room/' + roomId, { user: user, gameName: gameName });
      };

      //socket events
      socketRef.current.on('game found', handleGameFound);
      socketRef.current.on('user joined lobby', updateQueue);

      // TODO cleanup
    },
    // eslint-disable-next-line
    []
  );
  return (
    <div className="user-card card">
      <div className="user-card__video">
        <StyledVideo
          className="card-img-top"
          ref={userVideo}
          autoPlay={true}
          muted
          loop
          playsInline
          poster="assets/img/FFFFFF-0.png"
        />
      </div>
      <div className="user-card__body card-body">
        <p className="card-text">
          <b className="user-card__title">{user.username}</b>
          <br></br>
          <i className="user-card__subtitle">{user.description}</i>
          <br></br>
          <i className="user-card__subtitle">{user.university}</i>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
