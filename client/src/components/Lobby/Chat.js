import React, { useState } from 'react';

import Messages from '../Messages';

const Chat = () => {
	const [messages, setMessages] = useState([]);

	return (
		<div className="chat">
			<div className="chat__queue">
				<span className="chat__queue-title">Queue (3/5)</span>
				<div className="chat__queue-list">
					<span className="chat__queue-item">Greasy</span>
				</div>
			</div>
			<Messages
				messages={messages}
				sendMessage={(message) =>
					setMessages([...messages, { user: 'Kush', message }])
				}
			/>
		</div>
	);
};

export default Chat;
