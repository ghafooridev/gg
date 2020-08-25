import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardFooter } from "reactstrap";
import { useHistory } from 'react-router';
import { authenticationService } from 'services/authentication.service';

const GameCard = (props) => {
    const { title, subtitle, description, icon } = props;
    const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    useEffect(() => {
        const user = authenticationService.currentUserValue;
        if(user) { setIsLoggedIn(true); }
    }, authenticationService.currentUserValue)

    function joinLobby() {
        history.push("/lobby?gameName" + title);
    }

    return (
        <Card className="card-profile card-plain">
            <div className="card-logo info">
                <div className="icon icon-info">
                    <i className={icon} />
                </div>
            </div>

            <CardBody>
                <div className="author">
                    <CardTitle tag="h4">{title}</CardTitle>
                    <h6 className="card-category">{subtitle}</h6>
                </div>
                <p className="card-description text-center">
                    {description}
                </p>
            </CardBody>
            <CardFooter className="text-center">
                {isLoggedIn ? 
                <>
                    <button className="btn btn-primary" style={{"marginRight": "5px"}} onClick={joinLobby}>
                        Find Game
                    </button>
                    <button className="btn btn-default">Private Room</button>
                </>
                :
                <>
                </>
                }
                
            </CardFooter>
        </Card>
    )

}

export default GameCard;