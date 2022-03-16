import React from "react";
import useFadeIn from "./useFadeIn";

const index = () => {
    const fadeInH1 = useFadeIn(1, 2);
    const fadeInP = useFadeIn(2, 3);

    return (
        <div>
            <h1 {...fadeInH1}>FadeIn</h1>
            <p {...fadeInP}>?????????</p>
        </div>
    );
}

export default index;