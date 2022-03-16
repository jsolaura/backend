import React from "react";
import useTabs from './useTabs';

const index = () => {
    const content = [
        {
            tab: "Section 1",
            content: "I'm the content of the Section 1"
        },
        {
            tab: "Section 2",
            content: "I'm the content of the Section 2"
        },
    ]

    const {currentItem, changeItem} = useTabs(0, content);

    return (
        <div>
            {content.map((section,index) => (
                <button onClick={() => changeItem(index)} key={index}>{section.tab}</button>
            ))}
            <div>
                {currentItem.content}
            </div>

        </div>
    )
}

export default index;