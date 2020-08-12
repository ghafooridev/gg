import React from "react";

const styleObj = {
  "width": "100%",
  "text-align": "center",
  "margin-top": "20px"
}

function GamePageFooter(props) {
  return (
    <div style={styleObj}>
      <button type="button" class="btn btn-primary" 
        onClick={(e) => props.toggleAudio()}>
        {props.muteText} 
      </button>
    </div>
  );
}

export default GamePageFooter;