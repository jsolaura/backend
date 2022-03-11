import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from '@fortawesome/free-solid-svg-icons'


// const Form = ({ value, onChange, onCreate, onKeyPress }) => {
const Form = ({ onCreate}) => {
    const [input, setInput] = useState('');

    // input 값 변경
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    // enter key event
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onCreate(input);
            setInput('');
        }
    }

    return (
        <div className="askBox">
            <span id="saveBtn"><FontAwesomeIcon icon={faList} /></span>
            <input
                type="text"
                name="list"
                id="list"
                value={input}
                placeholder="해야할 일 !!!"
                onChange={handleChange}
                onKeyPress={handleKeyPress}
            />
            <button className="createBtn" onClick={() => {
                onCreate(input);
                setInput('');
            }}>추가</button>
        </div>
    )
}

export default Form;