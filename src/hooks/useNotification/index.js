import React from "react";
import useNotification from "./useNotification";

const index = () => {
    const triggerNotif = useNotification("파일을 다운 받으실건가요?", { body: "사용자 입력이 필요합니다", })

    return (
        <div>
            <button onClick={triggerNotif}>Hello</button>
        </div>
    );
}

export default index;