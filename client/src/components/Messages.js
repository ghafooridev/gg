import React, { useState, useEffect, useRef } from 'react';

import { Input, Button } from 'reactstrap';

const Messages = (props) => {
  const [message, setMessage] = useState();
  const chatRef = useRef();
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [props.messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('in handlesubmit');
    if (message !== '') {
      props.sendMessage(message);
    }
    setMessage('');
  };

  return (
    <div className="messages">
      <ul ref={chatRef} className="messages__chat">
        <li>
          Welcome to the game room! Feel free to share links and chat here
        </li>
        {props.messages.map((messageObj, index) => {
          return (
            <li key={index}>
              <p>
                <div style={{ display: 'inline', color: '#8dd002' }}>
                  {messageObj['user']}:
                </div>{' '}
                {messageObj['message']}
              </p>
            </li>
          );
        })}
      </ul>
      <div className="messages__input-container">
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Type message here"
            name="text"
            value={message}
            className="messages__input"
            autoComplete="off"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button className="messages__send">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
