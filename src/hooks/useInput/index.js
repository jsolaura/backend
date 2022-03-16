import React from "react";
import useInput from "./useInput";

const index = () => {
    const validator = (value) => !value.includes("@");
    const name = useInput("홍길동", validator);

    return (
        <div className={"hooksWrap"}>
            <label>useInput</label>
            <input {...name} placeholder="Name"/>

        </div>
    );
}

export default index;