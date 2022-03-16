import React from 'react';
import styles from './Player.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faPause, faPlay  } from '@fortawesome/free-solid-svg-icons'

const PlayerControls = (props) => {
    return (
        <div className={styles.playerControls}>
            <button className={"skip-btn"} onClick={() => props.SkipSong(false)}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className={"play-btn"} onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button>
            <button className={"skip-btn"} onClick={() => props.SkipSong()}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    );
};

export default PlayerControls;