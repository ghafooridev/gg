import React, { useState } from 'react';
import { useHistory } from 'react-router';

const styleObj = {
  width: '100%',
  textAlign: 'center',
  marginTop: '10px',
};

function GamePageFooter(props) {
  const history = useHistory();
  const [gameUrl, setGameUrl] = useState("");

  function leaveRoomClick(e) {
    e.preventDefault();
    history.push('/');
  }

  function handleChange(e) {
    e.preventDefault();
    setGameUrl(e.target.value);
  }

  function joinWithLink(e) {
    e.preventDefault();
    if (gameUrl.length === 0) return

    props.linkSubmitted(gameUrl);
  }

  return (
    <div style={styleObj}>
      {props.muteText === 'Mute' ? (
        <button
          type="button"
          className="btn btn-danger"
          onClick={(e) => props.toggleAudio()}
        >
          {' '}
          Mute{' '}
        </button>
      ) : (
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => props.toggleAudio()}
        >
          {' '}
          Unmute{' '}
        </button>
      )}

      <button
        type="button"
        className="btn btn-warning"
        style={{ marginLeft: '10px' }}
        onClick={leaveRoomClick}
      >
        {' '}
        Leave Room{' '}
      </button>

      <input type="text" placeholder="paste link here" 
      style={{ marginLeft: '10px', width: '300px' }}
      onChange={(e) => handleChange(e)}
      />
      <button
        type="button"
        className="btn btn-primary"
        style={{ marginLeft: '10px' }}
        onClick={joinWithLink}
      >
        Join with link
      </button>
    </div>
  );
}

export default GamePageFooter;
