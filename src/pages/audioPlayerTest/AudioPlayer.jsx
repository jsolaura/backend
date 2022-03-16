import React, {useEffect, useState} from 'react';
import styles from "./Audio.module.css";
import Player from "./Player";
import AudioList from "./AudioList";
import SearchKeyword from "../../components/search/SearchKeyword";
import {baseUrl} from "../../config";
import Tabs from "./Tabs";
import MainPlayer from "./MainPlayer";
import PickCastAudioService from "../../services/PickCastAudioService";

const AudioPlayer = () => {
    const [list, setList] = useState(false);
    const [appData, setAppData] = useState({});
    const [audioList, setAudioList] = useState([]);
    const [trackIndex, setTrackIndex] = useState(-1);

    const onBackButtonPress = () => {
        setList(false);
    };

    const onItemSelect = (tab, type) => {
        if (tab in appData) {
            if (type in appData[tab]) {
                const audioList = appData[tab][type];
                setAudioList(audioList);
            } else {
                setAudioList([]);
            }
        } else {
            setAudioList([]);
        }
        setList(true);
    };

    const onTrackSelect = (index) => {
        setTrackIndex(index);
    }

    const getPickCastAudioList = async () => {
        PickCastAudioService.getAll()
            .then(response => {
                console.log(response);
                setAudioList(response.data);
                setList(true);
            })
            .catch(err => {
                console.log(err);
        })
    }

    useEffect(() => {
        getPickCastAudioList();
        // setTrackIndex(1)
    }, []);

    return (
        <div className={`audioContainer`}>
            <h2 className={"mtb-20 app-quote"}>Find the best music for your code</h2>
            {/*<Tabs onItemSelect={onItemSelect} tabData={appData["homeScreen"]} />*/}
            <SearchKeyword placeholder={"Find your pickCast"} />
            {list && (
                <AudioList
                    audioList={audioList}
                    onTrackSelect={onTrackSelect}
                    onBackButtonPress={onBackButtonPress}
                />
            )}
            {/*<button onClick={() => setList(true)}>btn</button>*/}
            <MainPlayer trackIndex={trackIndex} audioList={audioList} />
        </div>

    );
};

export default AudioPlayer;