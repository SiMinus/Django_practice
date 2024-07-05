import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { Grid, Button, ButtonGroup, Typography } from '@mui/material';

import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from './Room';

function HomePage() {
    const [roomCode, setRoomCode] = useState(null)


    const handleCodeChecking = () => {
        fetch("/api/user-in-room")
          .then((response) => response.json())
          .then((data) => {
            setRoomCode(data.code)
          })
    }

    useEffect(() => {
        handleCodeChecking();
    }, [])

    const renderHomePage = () => {
        return(
          <Grid container spacing={3}>
            <Grid item xs={12} align="center" >
                <Typography variant='h3' component="h3">
                    House Party
                </Typography>
            </Grid>
            <Grid item xs={12} align="center">
                <ButtonGroup disableElevation variant='contained' color="primary">
                    <Button color='primary' to="/create" component={Link}>
                        Create A Room
                    </Button>
                    <Button color='secondary' to="/join" component={Link}>
                        Join A Room
                    </Button>
                </ButtonGroup>
            </Grid>

          </Grid>  
        );
        
    }



    return (
        <Router>
            <Routes>
                <Route path="/" element={roomCode ? <Navigate to={`/room/${roomCode}`} /> : renderHomePage()} />
                <Route path="/join" element={<RoomJoinPage/>} />
                <Route path="/create" element={<CreateRoomPage/>} />
                <Route path="/room/:roomCode" element={<Room/>} />

                

            </Routes>
        </Router>
    );

}

export default HomePage;