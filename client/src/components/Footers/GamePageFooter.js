import React from "react";
import { useHistory } from 'react-router';

const styleObj = {
  "width": "100%",
  "textAlign": "center",
  "marginTop": "20px"
}

function GamePageFooter(props) {
  const history = useHistory();

  function leaveRoomClick(e) {
    e.preventDefault();
    history.push("/");
  }

  return (
    <div style={styleObj}>    
      {props.muteText === "Mute" ?
        <button type="button" className="btn btn-danger"
          onClick={(e) => props.toggleAudio()}> Mute </button>
        :
        <button type="button" className="btn btn-primary" 
          onClick={(e) => props.toggleAudio()}> Unmute </button>
      }

      <button type="button" className="btn btn-warning" style={{"marginLeft": "10px"}}
        onClick={leaveRoomClick}> Leave Room </button>
    </div>
  );
}

export default GamePageFooter;