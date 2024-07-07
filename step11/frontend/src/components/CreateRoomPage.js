import React, {useState} from "react";
import { Link, useNavigate } from 'react-router-dom';

import { 
    Button,
    Grid,
    Typography,
    TextField,
    FormHelperText,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel
  } from "@mui/material";




function CreateRoomPage(props) {

    const defaultVotes = 2

    const navigate = useNavigate();
    const [state, setState] = useState({
      guestCanPause: true,
      votesToSkip: defaultVotes,
    });

    const handleVotesChange = (e) => {
      setState((state) => ({
        ...state,
        votesToSkip: e.target.value,
      }));
    }

    const handleGuestCanPauseChange = (e) => {
      setState((state) => ({
        ...state,
        guestCanPause: e.target.value === "true"? true: false,
      }));
    }

    const handleCreateButton = () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          votes_to_skip: state.votesToSkip,
          guest_can_pause: state.guestCanPause,
        })
      };
      fetch("/api/create-room", requestOptions)
        .then((response) => response.json())
        .then((data) => navigate("/room/" + data.code));
      // console.log(state)
    }



    return (
       <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography component="h4" variant="h4">
              Create A Room 
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <FormControl component="fieldset">
              <FormHelperText>
                <div align="center">Guest Controll of PlayBack State</div>
              </FormHelperText>
              <RadioGroup 
                row 
                defaultValue="true"
                onChange={handleGuestCanPauseChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" />}
                  label="Play/Pause"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                value="false"
                control={<Radio color="secondary" />}
                label="No Control"
                labelPlacement="bottom"
                />               
              </RadioGroup>
            </FormControl>

          </Grid>
          <Grid item xs={12} align="center">
            <FormControl>
              <FormHelperText>
                <div align="center">Votes required to skip song</div>
              </FormHelperText>
              <TextField
                required={true}
                type="number"
                defaultValue={defaultVotes}
                inputProps={{
                  min: 1,
                  style: { textAlign: "center"},
                }}
                onChange={handleVotesChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="primary"
              variant="contained"
              onClick={handleCreateButton}
            >
              Create A Room
            </Button>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              color="secondary"
              variant="contained"
              to="/"
              component={Link}
            >
              Back
            </Button>
          </Grid>

       </Grid>
    );
}
export default CreateRoomPage;
