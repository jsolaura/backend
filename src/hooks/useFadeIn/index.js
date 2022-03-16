import React from "react";
import useFullscreen from "./useFullscreen";

const index = () => {
    const onFullS = (isFull) => {
        console.log(isFull ? "We are full" : "We are small");
    }
    const { element, triggerFull, exitFull } = useFullscreen(onFullS);

    return (
        <>
            <div ref={element}>
                <img src={"https://bouncymustard.com/wp-content/uploads/2021/05/99-funny-meme-may.jpg"} alt={"funnyImg"} />
                <button onClick={exitFull}>exit fullscreen</button>
            </div>
            <button onClick={triggerFull}>Make fullscreen</button>
        </>
    );
}

export default index;