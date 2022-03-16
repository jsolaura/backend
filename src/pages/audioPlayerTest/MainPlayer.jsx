import React, {useEffect, useRef, useState} from 'react';
import {baseUrl} from "../../config";
import styles from "../../components/player/Player.module.css";
import AudioPlayer from "./AudioPlayer";
import Player from "./Player";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faBackward, faForward, faTimes } from '@fortawesome/free-solid-svg-icons'

const MainPlayer = ({ trackIndex, audioList }) => {
    const [slideUp, setSlideUp] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(trackIndex);
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
    const {
        name = "",
        imageUrl = "",
        audioFile = "",
    } = currentTrackIndex !== -1 ? audioList[currentTrackIndex] : {};


    const audioSrc = `${audioFile}`;
    const audioRef = useRef(new Audio(audioSrc));
    const intervalRef = useRef();

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setTrackProgress(audioRef.current.currentTime);
        }, 1000);
    }

    const onChangeTrackProgress = (e) => {
        setTrackProgress(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    const nextTrack = () => {
        if (currentTrackIndex < audioList.length - 1) {
            setCurrentTrackIndex((prevIndex) => prevIndex + 1);
            setTrackProgress(0);
        } else {
            setCurrentTrackIndex(0);
        }
    }

    const prevTrack = () => {
        if (currentTrackIndex) {
            setCurrentTrackIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentTrackIndex(audioList.length - 1);
        }
    }

    useEffect(() => {
        console.log({audioFile})
        clearInterval(intervalRef.current);
        setCurrentTrackIndex(trackIndex);
    }, [trackIndex]);

    useEffect(() => {
        if (currentTrackIndex !== -1) {
            audioRef.current.pause();
            audioRef.current = new Audio(audioSrc);
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
    }, [currentTrackIndex]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, [isPlaying])

    console.log({ trackProgress })
    return (
        <div className={`${styles.fixFooter} ${currentTrackIndex !== -1 ? styles._h115 : styles._h60} ${slideUp ? "active" : ""}`}>
            <div
                className={styles.slideUpBtn}
                onClick={() => {
                if (currentTrackIndex !== -1) {
                    setSlideUp(!slideUp);
                }}}> </div>
            <div className={"d-visilibity"}> </div>
            {slideUp && (
                <Player
                    name={name}
                    imageUrl={imageUrl}
                    duration={audioRef.current.duration}
                    trackProgress={trackProgress}
                    onChangeTrackProgress={onChangeTrackProgress}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    isPlaying={isPlaying}
                    nextTrack={nextTrack}
                    prevTrack={prevTrack} />

            )}

            {!slideUp && (
                <>
                {trackIndex !== -1 && (
                    <div className={styles.miniPlayer}>
                        <div className={"flex align-center"}>
                            <div className={styles.artistCoverImg}>
                                <img src={`${imageUrl}`} alt={""} />
                            </div>
                            <div className={styles.miniPlayerControl}>
                                <button onClick={() => setIsPlaying(!isPlaying)}>
                                    {isPlaying ? (
                                        <FontAwesomeIcon icon={faPause} />
                                    ) : (
                                        <FontAwesomeIcon icon={faPlay} />
                                    )}
                                </button>
                                <button><FontAwesomeIcon icon={faTimes} /></button>
                            </div>
                        </div>
                    </div>
                )}
                </>
            )}
        </div>
    );
};

export default MainPlayer;