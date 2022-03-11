import React from "react";
import './todo.css';
import TodoTemplate from "./TodoTemplate";
import Form from "./Form";
import TodoItemList from "./TodoItemList";

class TodoTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // input: "",
            todos: [

            ]
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        // this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }
    componentDidMount() {
        this.handleInitInfo();
    }
    handleInitInfo() {
        fetch("/api/todo")
            .then(res => res.json())
            .then(todos => this.setState({todos: todos}))
            .catch(err => console.log(err));
    }
    handleCreate(inputValue) {
        const { todos } = this.state;
        if (inputValue === "") {
            alert("오늘 할 일을 입력해주세요 !!!");
            return;
        }
        this.setState({
            // input: "",
            todos: todos.concat({
                id: 0,
                content: inputValue,
                isComplete: false,
            })
        });
        const data = {
            body: JSON.stringify({"title": inputValue}),
            headers: {'Content-Type': 'application/json'},
            method: 'post',
        }
        fetch("/api/todo", data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }
    handleToggle(id) {
        const { todos } = this.state;

        const completed = todos.find(todo => todo.id === id).isComplete;
        if(!window.confirm(completed ? "미완료 처리 하시겠습니까?" : "완료 처리 하시겠습니까?")) {
            return;
        }

        // 파라미터로 받은 id 를 가지고 몇 번째 아이템인지 찾는다.
        const index = todos.findIndex(todo => todo.id === id);

        // 선택한 객체를 저장한다.
        const selected = todos[index];

        // 배열을 복사한다.
        const nextTodos = [...todos];

        // 기존의 값을 복사하고 isComplete 값을 덮어쓴다.
        nextTodos[index] = {
            ...selected,
            completed : !selected.completed
        };

        this.setState({
            todos : nextTodos
        });

        const data = {
            headers: {
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'
            },
            method: 'put',
        }
        fetch("/api/todo/" + id, data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }
    handleRemove(id) {
        const { todos } = this.state;
        const title = todos.find(todo => todo.id === id).title;
        if(!window.confirm("'" + title + "' 을 삭제하시겠습니까?")) {
            return;
        }

        this.setState({
            todos : todos.filter(todo => todo.id !== id)
        });

        const data = {
            headers: {
                "access-control-allow-origin" : "*",
                'Content-Type': 'application/json'
            },
            method: 'delete',
        }
        fetch("/api/todo/" + id, data)
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status);
                } else {
                    return this.handleInitInfo();
                }
            })
            .catch(err => console.log(err));
    }
    // handleChange(e) {
    //     this.setState({
    //         input: e.target.value
    //     });
    // }
    //
    // *** Form.js 에서 Hook(useState) 사용으로 인해 state 에서 input 을 제외하고
    // parameter 로 받는다.
    // handleKeyPress(e) {
    //     if (e.key === "Enter") {
    //         this.handleCreate();
    //     }
    // }

    render() {
        return (
           <TodoTemplate form={(
               <Form
                // onChange={this.handleChange}
                // onKeyPress={this.handleKeyPress}
                // value={this.state.input}
                onCreate={this.handleCreate}/>
           )}
           >
               <TodoItemList
                   todos={this.state.todos}
                    onToggle={this.handleToggle}
                    onRemove={this.handleRemove}/>
           </TodoTemplate>
        )
    }

}

export default TodoTest;