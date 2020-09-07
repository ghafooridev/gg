import React from 'react';

import { Row, Col, Input, Button } from 'reactstrap';
import styled from 'styled-components';

const StyledMessageContainer = styled.div`
	width: 100%;
	height: 55vh;
	background: #2e3336;
`;

const Messages = (props) => {
	const textInput = React.createRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('in handlesubmit');

		textInput.current.value = '';

		const message = e.target.text.value;
		props.sendMessage(message);
	};

	return (
		<StyledMessageContainer>
			<ul className="messages">
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

			<Row>
				<Col>
					<form onSubmit={handleSubmit}>
						<Input
							style={{ width: '86%', display: 'inline' }}
							type="text"
							placeholder="Type message here"
							name="text"
							ref={textInput}
						/>
						<Button style={{ display: 'inline', width: '14%' }}>Send</Button>
					</form>
				</Col>
			</Row>
		</StyledMessageContainer>
	);
};

export default Messages;
