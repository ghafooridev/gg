import React from "react";

// reactstrap components
import { Row, Container } from "reactstrap";

const styleObj = {
  "width": "100%"
}

function GamePageFooter(props) {
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="" onClick={props.disableAudio}>
                  <div className="icon icon-info">
                    <i className="nc-icon lg nc-bulb-63" />
                  </div>
                  Mute 
                </a>
              </li>
              <li> 
                <a>
                  <div className="icon icon-info">
                    <i className="nc-icon lg nc-zoom-split" />
                  </div>
                  Turn Off Video
                </a>
              </li>
            </ul>
          </nav>
        </Row>
      </Container>
    </footer>
  );
}

export default GamePageFooter;