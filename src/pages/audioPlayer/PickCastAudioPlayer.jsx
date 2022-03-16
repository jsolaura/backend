import React from 'react';
import styles from './Audio.module.css';
import SearchKeyword from "../../components/search/SearchKeyword";
import Player from "./Player";
const PickCastAudioPlayer = () => {
    return (
        <div className={styles.pickCastAudioContainer}>
            <h2>Find the pickCast you like</h2>
            <SearchKeyword placeholder={"픽캐스트 명을 입력해주세요"} />
            <div className={styles.audioWrap}>
                {/*<Player />*/}

            </div>
        </div>
    );
};

export default PickCastAudioPlayer;