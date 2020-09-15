import React, { useState, useEffect } from 'react';

import Messages from '../Messages';
import authenticationService from '../../services/authentication.service';
import config from 'config';

const Chat = ({ queue, gameData, socketRef }) => {
  const [messages, setMessages] = useState([]);
  const user = authenticationService.currentUserValue;
  const queueRef = queue;

  const [userQueue, setUserQueue] = useState([]);
  const [nameMap, setNameMap] = useState({});
  const [queueLen, setQueueLen] = useState(0);

  // handle socket events
  useEffect(() => {
    // someone sent a message to the chat room
    const recieveChatMessage = (payload) => {
      console.log('message recieved!');
      setMessages((messages) => [
        ...messages,
        { message: payload.message, user: payload.sender },
      ]);
    };

    if (socketRef.current) {
      socketRef.current.on('message notification', recieveChatMessage);
    }
  }, [socketRef.current]);

  // queue changes
  useEffect(() => {
    setUserQueue(queueRef);
    setQueueLen(queueRef.length);

    queueRef.forEach(userId => {
      const requestOptions =  {method: 'GET'}
      fetch(`${config.apiUrl}/user/getInfo`, requestOptions)
      .then(res => res.json())
      .then(resJson => {
        setNameMap({...nameMap, 
          [userId]: resJson.name
        });
      });
    });
  }, [queueRef])

  // send chat message to lobby
  function sendMessage(message) {
    console.log('send message invoked!', message);
    socketRef.current.emit('user message', {
      message: message,
      sender: user.name,
      id: user._id,
      room: true,
    });
  }

  return (
    <div className="chat">
      <div className="chat__queue">
        <span className="chat__queue-title">Queue</span>
        <div className="chat__queue-list">
          <span className="chat__queue-item">{user.name}</span>
          {userQueue.map((userId, key) => (
            <span key={key} className="chat__queue-item">{userId}</span>
          ))}
        </div>
        <div className="chat__queue-item--prompt">
          Waiting for {(gameData ? gameData.minPlayers : 0) - queueLen} more
          players...
        </div>
      </div>
      <Messages messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
