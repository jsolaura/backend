import React from "react";
import useTitle from "./useTitle";

const index = () => {
    const titleUpdater = useTitle("Loading...");
    setTimeout(() => titleUpdater("Hooks"), 1000);

    return (
        <h1>{titleUpdater}</h1>
    );
}

export default index;