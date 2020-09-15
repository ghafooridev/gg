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
import config from "config";

const Lobby = (props) => {
  const user = authenticationService.currentUserValue;
  const [queue, setQueue] = useState(
    props.location.state.users ? props.location.state.users : [user.id]
  );
  const [secs, setSecs] = useState(1);
  const [mins, setMins] = useState(0);
  
  const history = useHistory();
  const lobbyId = props.match.params.lobbyId;
  const socketRef = useRef();
  const [joiningGame, setJoiningGame] = useState(false);

  const [gameName, setGameName] = useState("");
  const [gameData, setGameData] = useState();

  const updateQueue = (payload) => {
    console.log("Update queue invoked")
    setQueue([...queue, payload]);
  };

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

    const handleLobbyUsers = (users) => {
      console.log("lobby users:", users);
      // setQueue(users);
    }

    const handleGameFound = (payload) => {
      setJoiningGame(true);
      const roomId = payload.roomId;
      console.log('Redirecting to game room. user = ', user, gameName);
      history.push('/room/' + roomId, { user: user, gameName: gameName });
    };

    const handleUserDisconnect = (payload) => {
      setQueue(curQueue => {
        const index = curQueue.indexOf(payload.userId);
        if (index > -1) {
          return curQueue.splice(index, 1);
        }
      });
    }

    //socket events
    socketRef.current.on('game found', handleGameFound);
    socketRef.current.on('user joined lobby', updateQueue);
    socketRef.current.on('lobby users', handleLobbyUsers);
    socketRef.current.on('user disconnect', handleUserDisconnect);

    // cleanup
    return () => {
      clearInterval(interval);
      handleLeave();
      socketRef.current.disconnect();
    };
  }, [socketRef]);

  useEffect(() => {
    if (props.location.state && props.location.state.gameName) {
			setGameName(props.location.state.gameName);
		} else {
			const requestOptions = { method: 'GET' }
			fetch(`${config.apiUrl}/lobby/gameName?lobbyId=${lobbyId}`, requestOptions)
			.then(res => res.json())
			.then(resJson =>  setGameName(resJson.gameName));
		}
  });

  useEffect(() => {
    setGameData(GAME_DATA[gameName]);
  }, [gameName])

  useEffect(() => {
    if (secs === 0) {
      setMins((mins) => mins + 1);
    }
  }, [secs]);

  const handleLeave = () => {
    socketRef.current.emit("disconnect", {userId: user.userId, isRoom: false});

    const requestOptions = { method: 'PUT' };
    fetch(`${config.apiUrl}/user/leaveLobby?lobbyId=${lobbyId}&userId=${user.userId}`, requestOptions);
    
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
          <Stats gameName={gameName} />
          <UserCard
            user={user}
          />
          <Icebreaker />
          <Button color="primary" onClick={handleLeave}>
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
