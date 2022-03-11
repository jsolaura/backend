import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faCheck, faBackspace } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import TodoService from "../../services/TodoService";
import {useLocation} from "react-router-dom";


const Todo = () => {
    const initialTodoState = {
        id: null,
        title: "",
        orderNumber: "",
        complete: false,
    }
    const [todoList, setTodoList] = useState(initialTodoState);
    const [submitted, setSubmitted] = useState(false);
    const location = useLocation();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTodoList({...todoList, [name]: value});
    };
    const saveTodoList = () => {
        let data = {
            title: todoList.title,
            orderNumber: todoList.orderNumber,
            complete: todoList.complete,
        };
        TodoService.create(data)
            .then(response => {
                setTodoList({
                    id: response.data.id,
                    title: response.data.title,
                    orderNumber: response.data.orderNumber,
                    complete: response.data.complete,
                });
                setSubmitted(true);
                window.location = location;
                console.log(response.data);
            })
            .catch(e => {
                console.log(e.message());
            })
    }
    const newTodoRow = () => {
        setTodoList(initialTodoState);
        setSubmitted(false);
    }

    return (
        <div className="todoWrap">
            {submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newTodoRow}>
                    Add
                </button>
            </div>
            ) : (
            <div>
                <h1>TODO LIST</h1>
                <div className="askBox">
                    <span id="saveBtn"><FontAwesomeIcon icon={faList} /></span>
                    <input onKeyDown={(e)=> {
                        e.keyCode === 13 && saveTodoList() && newTodoRow();
                    }} onChange={handleInputChange} type="text" name="list" id="list" placeholder="내가 해야할 일은 ?"/>
                </div>
                <ul className="task">
                    <li className="checkBox">
                        <input type="hidden" id="id" />
                        <label className="completeBtn">
                            <FontAwesomeIcon icon={faCheck} />
                        </label>
                        <input className="check" type="checkbox"/>
                        <div id="content" className="content">
                            <span className="contentTitle"></span>
                            <button className="deleteBtn" type="button">
                                <FontAwesomeIcon icon={faBackspace} />
                            </button>
                        </div>
                    </li>
                </ul>
                <div className="status">
                    <span><strong className="activeNum"/>개 남음</span>
                    <div className="active">
                        <button type="button" className="all">ALL</button>
                        <button type="button" className="activeBtn">ACTIVE</button>
                        <button type="button" className="completeBtn">DONE</button>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Todo;