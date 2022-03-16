import React, {useEffect, useRef, useState} from 'react';
import useInput from "../hooks/useInput/useInput";
import useTabs from "../hooks/useTabs/useTabs";
// import useTitle from "../hooks/useTitle/useTitle";
import useClick from "../hooks/useClick/useClick";
import useHover from "../hooks/useHover/useHover";
import usePreventLeave from "../hooks/usePreventLeave/usePreventLeave";
import useNetwork from "../hooks/useNetwork/useNetwork";
import useFadeIn from "../hooks/useFadeIn/useFadeIn";
import useScroll from "../hooks/useScroll/useScroll";
import useFullscreen from "../hooks/useFullscreen/useFullscreen";
import useNotification from "../hooks/useNotification/useNotification";
import useAxios from "../hooks/useAxios/useAxios";
import useTitle from "hooks/useTitle/"


const Hooks = () => {
    const title = useTitle()
    const { loading, data, error, reFetch } = useAxios({ url: "https://yts.mx/api/v2/list_movies.json" });
    return (
        <div>
            <h1>{data && data.status}</h1>
            <h2>{loading && "Loading" }</h2>
            <button onClick={reFetch}>ReFetch</button>
        </div>
    );
};

export default Hooks;