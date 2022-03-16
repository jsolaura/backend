import React from "react";
import useScroll from "./useScroll";

const index = () => {
    const { y } = useScroll();

    return (
        <div style={{ height: "500vh" }}>
            <h1 style={{ position: "fixed", color: y > 100 ? "red" : "green" }}>!!!</h1>
        </div>
    );
}

export default index;