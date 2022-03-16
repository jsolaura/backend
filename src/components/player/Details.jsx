import React from 'react';
import styles from './Player.module.css';

const Details = (props) => {
    return (
        <div className={styles.playerDetails}>
            <div className={styles.detailsImg}>
                <img src={props.song.img_src} alt={""} />
            </div>
            <h3 className={styles.detailsTitle}>{props.song.title}</h3>
            <h3 className={styles.detailsArtist}>{props.song.artist}</h3>
        </div>
    );
};

export default Details;