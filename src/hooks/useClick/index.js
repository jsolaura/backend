import React from "react";
import useClick from "./useClick";

const index = () => {
    const onClickTitle = () => console.log("sayHello");
    const onClickContent = () => console.log("it's working");
    const title = useClick(onClickTitle);
    const content = useClick(onClickContent);

    return (
        <div>
            <h1 ref={title} >Hi</h1>
            <button ref={content}>??</button>

        </div>
    );
}

export default index;