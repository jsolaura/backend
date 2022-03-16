import React from "react";
import useConfirm from "./useConfirm";

const index = () => {
    const deleteWorld = () => console.log("Deleting the world");
    const abort = () => console.log("aborted")
    const confirmDelete = useConfirm("Are You Sure", deleteWorld, abort);

    return (
        <button onClick={confirmDelete}>Delete the world</button>
    );
}

export default index;