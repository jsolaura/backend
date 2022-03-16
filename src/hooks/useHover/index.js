import React from "react";
import useHover from "./useHover";

const index = () => {
    const onHoverTitle = () => console.log("hover right?");
    const onHoverContent = () => console.log("it's working");
    const title = useHover(onHoverTitle);
    const content = useHover(onHoverContent);

    return (
        <div>
            <h1 ref={title} >Hi</h1>
            <button ref={content}>??</button>
        </div>
    );
}

export default index;