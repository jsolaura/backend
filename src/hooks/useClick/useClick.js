import React, {useEffect, useRef} from 'react';

const useClick = (onClick) => {
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("click", onClick);
            }
        };
    }, [])
    if (typeof onClick !== "function") {
        return
    }
    return element;
};

// ex
// const onClickTitle = () => console.log("sayHello");
// const onClickContent = () => console.log("it's working");
// const title = useClick(onClickTitle);
// const content = useClick(onClickContent);
// return (
//     <div>
//         <h1 ref={title} >Hi</h1>
//         <button ref={content}>??</button>
//
//     </div>
// );

export default useClick;