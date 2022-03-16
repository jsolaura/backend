import React from 'react';
import styles from "./Audio.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward } from '@fortawesome/free-solid-svg-icons'

const Detail = ({
    name,
    imageUrl,
    movementDirection,
    duration,
    trackProgress ,
    onChangeTrackProgress,
    prevTrack,
    nextTrack
}) => {
    return (
        <div className={styles.audioDetail}>
            <div className={styles.detailImageWrap}>
                <img className={styles.audioItemImg} src={imageUrl} alt={""} />
            </div>
            <h2>{name}</h2>
            <h5>{movementDirection}</h5>
            <p>TestTestTestTestTestTestTestTestTestTestTestTestTest</p>
            <div className={styles.audioControl}>
                <input
                    type={"range"}
                    min={0}
                    step={1}
                    max={duration ? duration : 0}
                    value={trackProgress}
                    onChange={onChangeTrackProgress}
                />
                <div className={styles.audioBtnControl}>
                    <button onClick={prevTrack}><FontAwesomeIcon icon={faBackward} /></button>
                    <button onClick={nextTrack}><FontAwesomeIcon icon={faForward} /></button>
                </div>
            </div>

        </div>
    );
};

export default Detail;