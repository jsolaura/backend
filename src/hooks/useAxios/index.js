import React, {useEffect, useRef, useState} from "react";
import useAxios from "./useAxios";

const index = () => {
    const { loading, data, error, reFetch } = useAxios({ url: "http://192.168.0.13:8080/aws/ses/template/info/userWelcome" });

    return (
        <div>
            <h1>{data && data.status}</h1>
            <h2>{loading && "Loading" }</h2>
            <button onClick={reFetch}>ReFetch</button>
        </div>
    );
}

export default index;