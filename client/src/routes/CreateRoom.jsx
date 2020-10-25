import React from "react"
import { v1 as uuid } from "uuid"
import PropTypes from "prop-types"
import logo from "../logo.svg"

const CreateRoom = (props) => {
  function create() {
    const id = uuid()
    props.history.push(`/room/${id}`)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>GGchat</code>. Click on this button to create a room.
        </p>
        <button type="submit" onClick={create}>
          Create room
        </button>
      </header>
    </div>
  )
}

CreateRoom.propTypes = {
  history: PropTypes.shape.isRequired,
}

export default CreateRoom
