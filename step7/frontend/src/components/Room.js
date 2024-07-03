import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { useEffect } from "react";

function Room(){

    const { roomCode }= useParams();
    const [state, setState] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    })

    useEffect(() => {
        getRoomDetails();
      }, []);

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => response.json())
            .then((data) => {
                setState((state) => ({
                    ...state,
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                }))
            })
    }


    return (
        <div>
            <p>roomCode: {roomCode}</p>
            <p>votesToSkip: {state.votesToSkip}</p>
            <p>guestCanPause: {state.guestCanPause.toString()}</p>
            <p>isHost: {state.isHost.toString()}</p>
        </div>
    );



}

export default Room;