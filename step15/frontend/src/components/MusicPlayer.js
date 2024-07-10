import React from "react";
import {
    Grid,
    Typography,
    Card,
    IconButton,
    LinearProgress
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SkipNextIcon from '@mui/icons-material/SkipNext'


function MusicPlayer (props) {

    const { title, artist, image_url, duration, time, is_playing } = props.song;
    
    const songProgress = (time / duration) * 100;

    const playSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type':' application/json' },
        }
        fetch('/spotify/play-song', requestOptions);
    }

    const pauseSong = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type':' application/json' },
        }
        fetch('/spotify/pause-song', requestOptions);
    }


    return (
        <Card style={{ padding: '16px', margin: '16px', maxWidth: '400px', height: '150px' }}>
            <Grid container spacing={1} alignItems="center">
                <Grid item xs={4} align="center">
                    <img src={image_url} alt="Album Cover" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                </Grid>
                <Grid item xs={8} align="center">
                    <Typography variant="h5" component="h5">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {artist}
                    </Typography>
                    <div >
                        <IconButton onClick={is_playing ? pauseSong : playSong}>
                            {is_playing ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton>
                            <SkipNextIcon />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <LinearProgress variant="determinate" value={songProgress} style={{ marginTop: '16px' }} />
        </Card>
    );



}

export default MusicPlayer;