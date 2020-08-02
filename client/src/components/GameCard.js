import React, { Component } from 'react';
import {Card, CardBody, CardTitle, CardFooter, NavLink} from "reactstrap";
import { render } from '@testing-library/react';

class GameCard extends Component {
  // eslint-disable-next-line
  render() {
    const { title, subtitle, description, icon } = this.props;

    return (
      <Card className="card-profile card-plain">
        <NavLink href="" >
          <div className="card-logo info">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
            <div className="icon icon-info">
              <i className={icon} />
            </div>
            </a>
          </div>
          <CardBody>
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <div className="author">
                <CardTitle tag="h4">{title}</CardTitle>
                <h6 className="card-category">{subtitle}</h6>
              </div>
            </a>
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
  
}

export default GameCard;