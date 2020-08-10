import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

const styleObj = {
  "width": "100%",
  "text-align": "center",
  "height": "5%",
  "margin-top": "50px"
}

function GamePageFooter(props) {
  return (
    <div style={styleObj}>
      <a onClick={(e) => props.toggleAudio()}>
        {props.muteText} 
      </a>
    </div>
  );
}

export default GamePageFooter;