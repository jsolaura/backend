import React from 'react';

// 사용자가 이벤트를 실행하기 전에 메세지를 보여주고 싶을 때
const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
        return;
    }
    if (onCancel && typeof onCancel !== "function") {
        return;
    }

    const confirmAction = () => {
        if (window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    }

    return confirmAction;
};

// ex
// const deleteWorld = () => console.log("Deleting the world");
// const abort = () => console.log("aborted")
// const confirmDelete = useConfirm("Are You Sure", deleteWorld, abort);
// return (
//     <button onClick={confirmDelete}>Delete the world</button>
// );

export default useConfirm;