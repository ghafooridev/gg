import React from 'react';

const Rules = ({gameName}) => {
	return (
		<div className="rules">
			<h3 className="rules__heading">{gameName} Rules</h3>
			<p className="rules__content">
				To create a room:
				<ul>
					<li>Enter a name in the text above the icon</li>
					<li>Click on 'create a private room'</li>
					<li>We recommend you keep the default settings but on the next page, you are able to change the number of rounds, draw time, and language. </li>
					<li>Click on the copy link and enter it into the chatbox on the right side of the ggChat’s website.</li>
				</ul>

				To join a room:
				<ul>
					<li>Wait for one person in your party to create the room.</li>
					<li>Enter your name in the text box above the icon.</li>
					<li>Click on ‘Play’</li>
				</ul>

				How to play:
				<ul>
					<li>Each player in the game takes turns drawing the word at the top of the screen.</li>
					<li>When it’s your turn, you have 80 seconds to draw the word.</li>
					<li>Every other player will use the chat box inside the game to try and guess the word being drawn.</li>
					<li>The players can see how long the word is at the top and will be given letters as hints as time passes.</li>
					<li>The faster you guess, the more points you get.</li>
				</ul>
			</p>
		</div>
	);
};

export default Rules;
