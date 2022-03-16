import React, {useEffect, useRef} from 'react';

const UseHover = (onHover) => {
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("mouseenter", onHover);
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("mouseenter", onHover);
            }
        };
    }, [])
    if (typeof onHover !== "function") {
        return
    }
    return element;
};

// ex
// const onHoverTitle = () => console.log("hover right?");
// const onHoverContent = () => console.log("it's working");
// const title = useHover(onHoverTitle);
// const content = useHover(onHoverContent);
// return (
//     <div>
//         <h1 ref={title} >Hi</h1>
//         <button ref={content}>??</button>
//
//     </div>
// );

export default UseHover;