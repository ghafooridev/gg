import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

import Rules from '../components/Lobby/Rules';
import UserCard from '../components/Lobby/UserCard';
import Icebreaker from '../components/Lobby/Icebreaker';
import Chat from '../components/Lobby/Chat';
import Stats from '../components/Lobby/Stats';
import authenticationService from 'services/authentication.service.js';
import { GAME_DATA } from '../constants';
import config from 'config';

const Lobby = (props) => {
  const user = authenticationService.currentUserValue;

  const [secs, setSecs] = useState(1);
  const [mins, setMins] = useState(0);

  const history = useHistory();
  const lobbyId = props.match.params.lobbyId;
  const socketRef = useRef();
  const [joiningGame, setJoiningGame] = useState(false);

  const [gameName, setGameName] = useState('');
  const [gameData, setGameData] = useState();

  useEffect(() => {
    socketRef.current = io.connect('/');

    // start timer
    const interval = setInterval(() => {
      setSecs((secs) => {
        if (secs === 59) {
          return 0;
        } else {
          return secs + 1;
        }
      });
    }, 1000);

    socketRef.current.emit('user queue', {
      user: user,
      lobbyId: lobbyId,
      gameName: gameName,
    });

    const handleGameFound = (payload) => {
      setJoiningGame(true);
      const roomId = payload.roomId;
      setTimeout(() => {
        history.push('/room/' + roomId, { user: user, gameName: gameName });
      }, 3000);
    };

    //socket events
    socketRef.current.on('game found', handleGameFound);

    // cleanup
    return () => {
      clearInterval(interval);
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  useEffect(() => {
    if (props.location.state && props.location.state.gameName) {
      setGameName(props.location.state.gameName);
    } else {
      const requestOptions = { method: 'GET' };
      fetch(
        `${config.apiUrl}/lobby/gameName?lobbyId=${lobbyId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((resJson) => setGameName(resJson.gameName));
    }
  });

  useEffect(() => {
    setGameData(GAME_DATA[gameName]);
  }, [gameName]);

  useEffect(() => {
    if (secs === 0) {
      setMins((mins) => mins + 1);
    }
  }, [secs]);

  const handleLeave = () => {
    history.push('/');
  };

  return (
    <div className="lobby">
      <h1 className="lobby__heading">
        {joiningGame
          ? 'Joining game ...'
          : `Waiting for other Players ${mins > '9' ? mins : `0${mins}`}:${
              secs > '9' ? secs : `0${secs}`
            }`}
      </h1>
      <div className="lobby__container">
        <div className="lobby__col--33">
          <Rules gameName={gameName} />
        </div>
        <div className="lobby__col--33 text-center">
          <Stats gameName={gameName} />
          <UserCard user={user} />
          <Icebreaker />
          <Button color="primary" onClick={handleLeave}>
            Leave Queue
          </Button>
        </div>
        <div className="lobby__col--33">
          <Chat gameData={gameData} socketRef={socketRef} />
          {/* <Ad /> */}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
