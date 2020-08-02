import React from "react";
import logo from '../logo.svg';
import { v1 as uuid } from "uuid";

const CreateRoom = (props) => {
    function create() {
        const id = uuid();
        props.history.push(`/room/${id}`);
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <p>
                    Welcome to <code>Spiel</code>. Click on this button to create a room.
                    </p>
                    <button onClick={create}>Create room</button>
            </header>
        </div>
        
    );
};

export default CreateRoom;