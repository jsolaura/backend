import React, {useEffect, useRef} from 'react';

const useFadeIn = (duration = 1, delay = 0) => {
    if (typeof duration !== "number" || typeof delay !== "number") {
        return;
    }
    const element = useRef(null
    );
    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
            current.style.opacity = 1;
        }
    }, [duration, delay])
    return {ref: element, style: { opacity: 0 }};
};

// ex
// const fadeInH1 = useFadeIn(1, 2);
// const fadeInP = useFadeIn(2, 3);
//
// return (
//     <div>
//         <h1 {...fadeInH1}>FadeIn</h1>
//         <p {...fadeInP}>?????????</p>
//     </div>
// );

export default useFadeIn;