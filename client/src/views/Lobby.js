import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

import Rules from '../components/Lobby/Rules';
import UserCard from '../components/Lobby/UserCard';
import Icebreaker from '../components/Lobby/Icebreaker';
import Chat from '../components/Lobby/Chat';
import authenticationService from 'services/authentication.service.js';
import { GAME_DATA } from '../constants';

const Lobby = (props) => {
  const user = authenticationService.currentUserValue;
  const [queue, setQueue] = useState(
    props.location.state.users ? props.location.state.users : [user.name]
  );
  const [secs, setSecs] = useState(1);
  const [mins, setMins] = useState(0);
  const gameName = props.location.state.gameName;
  const gameData = GAME_DATA[gameName];
  const history = useHistory();
  const lobbyId = props.match.params.lobbyId;
  const socketRef = useRef();
  const [joiningGame, setJoiningGame] = useState(false);

  const updateQueue = (payload) => {
    setQueue([...queue, payload]);
  };

  useEffect(() => {
    socketRef.current = io.connect('/');
    const interval = setInterval(() => {
      setSecs((secs) => {
        if (secs === 59) {
          return 0;
        } else {
          return secs + 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(interval);
      socketRef.current.disconnect();
    };
  }, []);

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
          <Rules />
        </div>
        <div className="lobby__col--33 text-center">
          <UserCard
            updateQueue={updateQueue}
            user={user}
            lobbyId={lobbyId}
            gameName={gameName}
            socketRef={socketRef}
            setJoiningGame={setJoiningGame}
          />
          <Icebreaker />
          <Button color="primary" className="m-auto" onClick={handleLeave}>
            Leave Queue
          </Button>
        </div>
        <div className="lobby__col--33">
          <Chat queue={queue} gameData={gameData} socketRef={socketRef} />
          {/* <Ad /> */}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
