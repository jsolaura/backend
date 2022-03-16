import React from 'react';
import styles from "./Audio.module.css";

const Player = ({ audioList, onTrackSelect }) => {
    return (
        <ul className={styles.audioList}>
            {audioList.length ? (
                audioList.map((item, index) => (
                    <li onClick={() => onTrackSelect(index)}
                        key={index}
                        className={styles.audioItem}>
                        <img className={styles.audioItemImg} src={item.imageUrl} alt={""} />
                        <p className={styles.audioItemInfo}>{item.name}</p>
                    </li>
                ))
            ) : (
                <div className={styles.noData}>
                    <p>No Audio Available</p>
                </div>
            )}
        </ul>
    );
};

export default Player;