import React, {useRef} from 'react';

const useFullscreen = (callback) => {
    const element = useRef();
    const runCb = isFull => {
        if (callback && typeof callback === "function") {
            callback(isFull);
        }
    }
    const triggerFull = () => {
        if (element.current) {
            if (element.current.requestFullscreen) {
                element.current.requestFullscreen();
            } else if (element.current.mozRequestFullScreen) {
                element.current.mozRequestFullScreen();
            } else if (element.current.webkitRequestFullScreen) {
                element.current.webkitRequestFullScreen();
            } else if (element.current.msRequestFullScreen) {
                element.current.msRequestFullScreen();
            }
        }
        runCb(true);
    }
    const exitFull = () => {
        document.exitFullscreen();
        if (element.current) {
            if (element.current.requestFullscreen) {
                element.current.requestFullscreen();
            } else if (element.current.mozRequestFullscreen) {
                element.current.mozRequestFullscreen();
            } else if (element.current.webkitRequestFullscreen) {
                element.current.webkitRequestFullscreen();
            } else if (element.current.msRequestFullscreen) {
                element.current.msRequestFullscreen();
            }
        }
        runCb(false);
    }

    return { element, triggerFull, exitFull };
};

// ex
// const onFullS = (isFull) => {
//     console.log(isFull ? "We are full" : "We are small");
// }
// const { element, triggerFull, exitFull } = useFullscreen(onFullS);
//
// return (
//     <>
//         <div ref={element}>
//             <img src={"https://bouncymustard.com/wp-content/uploads/2021/05/99-funny-meme-may.jpg"} alt={"funnyImg"} />
//             <button onClick={exitFull}>exit fullscreen</button>
//         </div>
//         <button onClick={triggerFull}>Make fullscreen</button>
//     </>
// );

export default useFullscreen;