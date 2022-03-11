import React from "react";

const TodoTemplate = ({ form, children }) => {
    return (
        <div className="todoWrap">
            <div>
                <h1>TODO LIST</h1>
                <section className="askBox todoForm">
                    {form}
                </section>
                <ul className="task todoListWrapper">
                    {children}
                </ul>
                <div className="status">
                    <span><strong className="activeNum"></strong> 개 남음</span>
                    <div className="active">
                        <button className="all" type="button">모두보여줘</button>
                        <button className="activeBtn" type="button">해야할 일</button>
                        <button className="completeBtn" type="button">다 했다</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoTemplate;