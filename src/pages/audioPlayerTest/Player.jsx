import React, {useEffect, useRef, useState} from 'react';
import styles from '../../components/player/Player.module.css';
import {baseUrl} from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

const Player = ({ name, imageUrl, duration, trackProgress, onChangeTrackProgress, onPlayPause, isPlaying, nextTrack, prevTrack }) => {
   const currentProgress = (trackProgress / duration) * 100;
   const trackProgressStyling = `linear-gradient(to right, #fff ${currentProgress}%, grey ${currentProgress}%`;
    return (
       <div className={styles.audioPlayerLg}>
            <div className={styles.audioCoverLgImg}>
                <img src={`${imageUrl}`} alt={""} />
            </div>
           <div>
               <h2>{name}</h2>
           </div>
           <div className={styles.audioPlayerProgress}>
               <input
                   type={"range"}
                   min={"0"}
                   step={"1"}
                   max={duration ? duration : 0}
                   value={trackProgress}
                   onChange={onChangeTrackProgress}
                   style={{ background: trackProgressStyling }}
               />
           </div>
           <div className={styles.audioControls}>
               <button onClick={prevTrack}>
                   <FontAwesomeIcon icon={faBackward} />
               </button>
               <div className={styles.playPauseBtn}>
                   <button onClick={onPlayPause}>
                       {isPlaying ? (
                           <FontAwesomeIcon icon={faPause} />
                       ) : (
                           <FontAwesomeIcon icon={faPlay} />
                       )}
                   </button>
                   <button onClick={nextTrack}>
                       <FontAwesomeIcon icon={faForward} />
                   </button>
               </div>
           </div>

       </div>
   )
};

export default Player;