import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

import Messages from '../Messages';
import authenticationService from '../../services/authentication.service';

const Chat = ({ queue, gameData, socketRef }) => {
  const [messages, setMessages] = useState([]);
  const user = authenticationService.currentUserValue;
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
  }, [socketRef]);

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
          {queue.map((item) => (
            <span className="chat__queue-item">{item}</span>
          ))}
        </div>
        <div className="chat__queue-item--prompt">
          Waiting for {(gameData ? gameData.minPlayers : 0) - queue.length} more
          players...
        </div>
      </div>
      <Messages messages={messages} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
