import React, { useState, useEffect } from "react"
import { Card, CardBody, CardTitle, CardFooter } from "reactstrap"
import { useHistory } from "react-router"
import PropTypes from "prop-types"

import authenticationService from "../services/authentication.service"
import { apiUrl } from "../config"

const GameCard = ({ title, subtitle, description, icon, comingSoon }) => {
  const history = useHistory()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    console.log("Running useEffect")
    const user = authenticationService.currentUserValue
    if (user) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  function joinLobby() {
    fetch(`${apiUrl}/user/joinLobby?game=${title}`, {
      mode: "cors",
      method: "PUT",
      credentials: "same-origin",
    }).then((response) => {
      response.json().then((json) => {
        history.push({
          pathname: `/lobby/${json.lobbyId}`,
          state: {
            users: json.users,
            gameName: title,
          },
        })
      })
    })
  }

  function createRoom() {
    console.log("apiURL: ", apiUrl)
    fetch(`${apiUrl}/room/create?game=${title}`, {
      mode: "cors",
      method: "POST",
      credentials: "same-origin",
    }).then((response) => {
      response.json().then((json) => {
        console.log(json)
        history.push({
          pathname: `/room/${json.roomId}`,
          state: { gameName: title },
        })
      })
    })
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
        <p className="card-description text-center">{description}</p>
      </CardBody>
      <CardFooter className="text-center">
        {isLoggedIn && !comingSoon ? (
          <>
            <button
              type="button"
              className="btn btn-primary"
              style={{ marginRight: "5px" }}
              onClick={joinLobby}
            >
              Find Game
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={createRoom}
            >
              Private Room
            </button>
          </>
        ) : (
          <></>
        )}
        {comingSoon ? (
          <>
            <p style={{ color: "darkturquoise", fontSize: "17px" }}>
              Coming soon!
            </p>
          </>
        ) : (
          <></>
        )}
      </CardFooter>
    </Card>
  )
}

GameCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  comingSoon: PropTypes.bool.isRequired,
}

export default GameCard
