import React, {useEffect} from 'react';

const useBeforeLeave = (onBefore) => {
    const handle = (event) => {
        // 최상단으로 마우스가 움직일 경우에만
        const { clientY } = event;
        if (clientY <= 0) {
            onBefore();
        }
    };
    useEffect(() => {
        if (typeof onBefore === "function") {
            document.addEventListener("mouseleave", handle);
            return () => document.removeEventListener("mouseleave", handle);
        }
    }, [])
};

// ex
// const begForLife = () => console.log("pls dont leave");
// useBeforeLeave(begForLife);
// return (
//     <div>
//         <h1>Hello</h1>
//     </div>
// );

export default useBeforeLeave;