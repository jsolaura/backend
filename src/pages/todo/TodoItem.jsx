import React from "react";
import {faBackspace, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class TodoItem extends React.Component {
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     return this.props.isComplete !== nextProps.isComplete;
    // }

    render() {
        const {content, isComplete, id, onToggle, onRemove} = this.props;
        console.log(content, isComplete)

        return (
            <>
            <div className="task">
                <div className="checkBox">
                    <input type="hidden" id={id} />
                    <label className={`completeBtn ${isComplete ? 'on' : ''}`} onClick={() => onToggle(id)}>
                        <FontAwesomeIcon icon={faCheck} />
                    </label>
                    <input className="check" type="checkbox" />
                    <div id="content" className="content">
                        <span>{content}</span>
                        <button className="deleteBtn" type="button" onClick={(e) => {
                            e.stopPropagation();
                            onRemove(id)
                        }}>
                            <FontAwesomeIcon icon={faBackspace} />
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default TodoItem;