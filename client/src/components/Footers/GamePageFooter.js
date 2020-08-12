import React from "react";

const styleObj = {
  "width": "100%",
  "text-align": "center",
  "margin-top": "20px"
}

function GamePageFooter(props) {
  return (
    <div style={styleObj}>    
      {props.muteText === "Mute" ?
        <button type="button" class="btn btn-danger"
          onClick={(e) => props.toggleAudio()}> Mute </button>
        :
        <button type="button" class="btn btn-primary" 
          onClick={(e) => props.toggleAudio()}> Unmute </button>
      }
    </div>
  );
}

export default GamePageFooter;