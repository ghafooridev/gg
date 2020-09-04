import React from 'react';
import { Button } from 'reactstrap';

import Rules from '../components/Lobby/Rules';
import UserCard from '../components/Lobby/UserCard';
import Icebreaker from '../components/Lobby/Icebreaker';
import Chat from '../components/Lobby/Chat';
import Ad from '../components/Ad';

const Lobby = (props) => {
	return (
		<div className="lobby">
			<h1 className="lobby__heading">
				{/*joiningGame ? "Joining game ..." : "Matching with other players ..."*/}
				Waiting for other Players 0:05
			</h1>
			<div className="lobby__container">
				<div className="lobby__col">
					<Rules />
				</div>
				<div className="lobby__col text-center">
					<UserCard />
					<Icebreaker />
					<Button color="primary" className="m-auto">
						Leave Queue
					</Button>
				</div>
				<div className="lobby__col">
					<Chat />
					<Ad />
				</div>
			</div>
		</div>
	);
};

export default Lobby;
