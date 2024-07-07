import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Grid, Button, Typography } from "@mui/material";

import CreateRoomPage from "./CreateRoomPage";

function Room(props){

    const navigate = useNavigate();
    const { roomCode }= useParams();
    const [state, setState] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
        showSettings: false,
    })

    useEffect(() => {
        getRoomDetails();
      }, []);

    const getRoomDetails = () => {
        fetch("/api/get-room" + "?code=" + roomCode)
            .then((response) => {
                if(!response.ok){
                    props.leaveRoomCallback();
                    navigate('/')
                }
                return response.json()
            })
            .then((data) => {
                setState((state) => ({
                    ...state,
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                }))
            })
    }

    const leaveRoomButton = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        }
        fetch("/api/leave-room", requestOptions)
          .then((response) => {
            props.leaveRoomCallback();
            navigate('/');

          })

    }

    const updateShowSettings = (value) => {
        setState((state) => ({
            ...state,
            showSettings: value,
        }))
    }

    const renderSettingsButton = () => {
        return (
            <Grid item xs={12} align="center">
                <Button variant="contained" color="primary" onClick={() => updateShowSettings(true)} >
                    Settings
                </Button>
            </Grid>
        );
    }

    const renderSettings = () => {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <CreateRoomPage
                        update={true}
                        votesToSkip={state.votesToSkip}
                        guestCanPause={state.guestCanPause}
                        roomCode={roomCode}
                        updateCallback={getRoomDetails}
                        redirectCallback={() => updateShowSettings(false)}
                    />

                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" color="secondary" onClick={() => updateShowSettings(false)} >
                        Close
                    </Button>
                </Grid>
                

            </Grid>
        );

    }
    if(state.showSettings){
        return renderSettings();
    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                    Room Code: {roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Votes Needed To Skip : 
                    <span style={{ color: "red" }}>
                        {state.votesToSkip}
                    </span> 
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    Guest  
                    <span style={{ color: "red" }}>
                        {state.guestCanPause.toString() === 'true' ? " CAN " : " CAN NOT "}
                    </span>
                    Pause
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <Typography variant="h6" component="h6">
                    You
                    <span style={{ color: "red" }}>
                        {state.isHost.toString() === 'true' ? " ARE " : " ARE NOT "}
                    </span> the Host
                </Typography>
            </Grid>
            {state.isHost ? renderSettingsButton() : null}
            <Grid item xs={12} align="center">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={leaveRoomButton}
                >
                    Leave this Room
                </Button>
            </Grid>
             
            

        </Grid>



        // <div>
        //     <p>roomCode: {roomCode}</p>
        //     <p>votesToSkip: {state.votesToSkip}</p>
        //     <p>guestCanPause: {state.guestCanPause.toString()}</p>
        //     <p>isHost: {state.isHost.toString()}</p>
        // </div>
    );



}

export default Room;