import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import qs from 'qs';

import Rules from '../components/Lobby/Rules';
import UserCard from '../components/Lobby/UserCard';
import Icebreaker from '../components/Lobby/Icebreaker';
import Chat from '../components/Lobby/Chat';
import authenticationService from 'services/authentication.service.js';
import { GAME_DATA } from '../constants';

const Lobby = (props) => {
  const user = authenticationService.currentUserValue;
  const [queue, setQueue] = useState([user.username]);
  const [secs, setSecs] = useState(1);
  const [mins, setMins] = useState(0);
  const [gameData, setGameData] = useState({});
  const history = useHistory();
  const lobbyId = props.match.params.lobbyId;
  let params = {};

  const updateQueue = (payload) => {
    setQueue([...queue, payload]);
  };

  useEffect(() => {
    params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    setGameData(GAME_DATA[params.gameName]);
    const interval = setInterval(() => {
      setSecs((secs) => {
        if (secs === 59) {
          return 0;
        } else {
          return secs + 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
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
        {/*joiningGame ? "Joining game ..." : "Matching with other players ..."*/}
        Waiting for other Players {mins > '9' ? mins : `0${mins}`}:
        {secs > '9' ? secs : `0${secs}`}
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
            gameName={params.gameName}
          />
          <Icebreaker />
          <Button color="primary" className="m-auto" onClick={handleLeave}>
            Leave Queue
          </Button>
        </div>
        <div className="lobby__col--33">
          <Chat queue={queue} gameData={gameData} />
          {/* <Ad /> */}
        </div>
      </div>
    </div>
  );
};

export default Lobby;
