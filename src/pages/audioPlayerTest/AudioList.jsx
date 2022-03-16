import React from 'react';
import styles from './Audio.module.css';
import {baseUrl} from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward, faTimes } from '@fortawesome/free-solid-svg-icons'

const AudioList = ({ onBackButtonPress, audioList, onTrackSelect }) => {
    return (
        <div className={styles.audioLs}>
            <div onClick={onBackButtonPress} className={styles.audioLsHeader}>
                <FontAwesomeIcon icon={faBackward} />
            </div>
            <ul>
                {audioList.length ? (
                    audioList.map((item, index) => (
                        <li
                            onClick={() => onTrackSelect(index)}
                            key={index}
                            className={styles.audioLsContainer}
                        >
                            <div className={styles.audioLsItem}>
                                <div className={styles.audioImg}>
                                    <img src={`${item.imageUrl}`} alt={""} />
                                </div>
                                <div className={styles.audioInfo}>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p style={styles.noData}>
                        No Audio Available
                    </p>
                )}
            </ul>
        </div>
    );
};

export default AudioList;