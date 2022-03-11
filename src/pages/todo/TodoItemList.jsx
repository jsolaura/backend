import React from "react";
import TodoItem from "./TodoItem";

class TodoItemList extends React.Component {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.todos !== nextProps.todos;
    // }

    render() {
        const { todos, onToggle, onRemove } = this.props;
        console.log(todos);
        const todoList = todos.map(
            ({id, title, completed}) => (
                <TodoItem
                    id={id}
                    content={title}
                    isComplete={completed}
                    onToggle={onToggle}
                    onRemove={onRemove}
                    key={id} />
            )
        );
        return (
            <div>
                {todoList}
            </div>

        )
    }
}

export default TodoItemList;