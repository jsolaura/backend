import React, {useEffect} from 'react';

// 알람 실행
const useNotification = (title, options) => {
    if (!("Notification" in window)) {
        return;
    }
    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
                .then(permition => {
                    if (permition === "granted") {
                        new Notification(title, options);
                    }
                })
        } else {
            new Notification(title, options);
        }
    };
    return fireNotif;
};

// ex
// const triggerNotif = useNotification("파일을 다운 받으실건가요?", { body: "사용자 입력이 필요합니다", })
//
// return (
//     <div>
//         <button onClick={triggerNotif}>Hello</button>
//     </div>
// );

export default useNotification;