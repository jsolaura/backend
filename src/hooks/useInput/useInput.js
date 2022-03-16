import {useState} from "react";

const useInput = (initialValue, validator) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
        const {
            target: { value }
        } = e;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };
    return { value, onChange };
};

// ex
// const validator = (value) => !value.includes("@");
// const name = useInput("홍길동", validator);
// return (
//     <div className={"hooksWrap"}>
//         <label>useInput</label>
//         <input {...name} placeholder="Name"/>
//
//     </div>
// );

export default useInput;