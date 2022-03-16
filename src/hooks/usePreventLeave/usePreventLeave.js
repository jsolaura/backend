import React from 'react';

// 사용자가 이벤트를 실행을 마칠 때 메세지를 주고싶을 때
// 사이트를 떠나겠습니까 ?
const usePreventLeave = () => {
    const listener = (e) => {
        e.preventDefault();
        e.returnValue = "";
    }
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () => window.removeEventListener("beforeunload", listener);

    return { enablePrevent, disablePrevent }
};

// ex
// const {enablePrevent, disablePrevent} = usePreventLeave();
//
// return (
//     <div>
//         <button onClick={enablePrevent}>Protect</button>
//         <button onClick={disablePrevent}>UnProtect</button>
//     </div>
// );

export default usePreventLeave;