import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

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

const UserCard = ({ user }) => {
  const userVideo = useRef();

  // connect to video
  useEffect(() => {
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
  }, []);

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
        <p className="user-card__text">
          <b className="user-card__title">{user.name}</b>
          <br></br>
          <i className="user-card__subtitle">{user.username}</i>
          <br></br>
          <i className="user-card__subtitle">{user.university}</i>
        </p>
        <p className="user-card__badges">
          <div className="label label-info mr-2">Novice</div>
          <div className="label label-success">Alpha Tester</div>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
