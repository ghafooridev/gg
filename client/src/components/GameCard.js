import React from 'react';
import { Card, CardBody, CardTitle, CardFooter, NavLink } from "reactstrap";

const GameCard = (props) => {
    const { title, subtitle, description, icon } = props;

    return (
        <Card className="card-profile card-plain">
            <NavLink href="/lobby" >
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
                </CardFooter>
            </NavLink>
        </Card>
    )

}

export default GameCard;