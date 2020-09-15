import React, { useState, useEffect } from 'react';

import Messages from '../Messages';
import authenticationService from '../../services/authentication.service';
import config from 'config';

const Chat = ({ gameData, socketRef }) => {
  const [messages, setMessages] = useState([]);
  const user = authenticationService.currentUserValue;

  const [queue, setQueue] = useState([user._id]);
  const [userIdMap, setUserIdMap] = useState({[user._id]: user});

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

    // recieve information about current lobby users
    const handleLobbyUsers = (users) => {
      console.log("lobby users:", users);
      if (!users) return
      
      setQueue([...users, user._id]);
    }

    // update current queue
    const updateQueue = (payload) => {
      console.log("Update queue invoked")
      setQueue([...queue, payload]);
    };

    // handle user disconnect event
    const handleUserDisconnect = (payload) => {
      setQueue(curQueue => {
        const index = curQueue.indexOf(payload.userId);
        if (index > -1) {
          return curQueue.splice(index, 1);
        }
      });
    }

    // handle socket events
    if (socketRef.current) {
      socketRef.current.on('message notification', recieveChatMessage);
      socketRef.current.on('lobby users', handleLobbyUsers);
      socketRef.current.on('user joined lobby', updateQueue);
      socketRef.current.on('user disconnect', handleUserDisconnect);      
    }
  }, [socketRef.current]);

  // queue changes, fetch new user info
  useEffect(() => {
    queue.forEach(userId => {
      const requestOptions =  {method: 'GET'}
      fetch(`${config.apiUrl}/user/getInfo?userId=${userId}`, requestOptions)
      .then(res => res.json())
      .then(resJson => {
        console.log("FETCHED: ", resJson);
        setUserIdMap((curUserIdMap) => 
          ({...curUserIdMap, [userId]: resJson })
        );
      });
    });
    console.log("CHAT queue: ", queue);
    console.log("CHAT userIdMap: ", userIdMap);
  }, [queue])

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
          {queue.map((userId, key) => (
            <span key={key} className="chat__queue-item">{ (userId in userIdMap) ? userIdMap[userId].name : "Error"} 
              ({(userId in userIdMap) ? userIdMap[userId].university: "Error Univ"})</span>
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
