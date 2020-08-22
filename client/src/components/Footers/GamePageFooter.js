import React from "react";

const styleObj = {
  "width": "100%",
  "textAlign": "center",
  "marginTop": "20px"
}

function GamePageFooter(props) {
  return (
    <div style={styleObj}>    
      {props.muteText === "Mute" ?
        <button type="button" className="btn btn-danger"
          onClick={(e) => props.toggleAudio()}> Mute </button>
        :
        <button type="button" className="btn btn-primary" 
          onClick={(e) => props.toggleAudio()}> Unmute </button>
      }
    </div>
  );
}

export default GamePageFooter;