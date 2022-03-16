import React, {useState} from 'react';

const UseTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    console.log(currentIndex)
    if (!allTabs || !Array.isArray(allTabs)) {
        return;
    }
    return {
        currentItem: allTabs[currentIndex],
        changeItem: setCurrentIndex,
    }
};

// ex
// const content = [
//     {
//         tab: "Section 1",
//         content: "I'm the content of the Section 1"
//     },
//     {
//         tab: "Section 2",
//         content: "I'm the content of the Section 2"
//     },
// ]
//
// const {currentItem, changeItem} = useTabs(0, content);
// return (
//     <div>
//         {content.map((section,index) => (
//             <button onClick={() => changeItem(index)} key={index}>{section.tab}</button>
//         ))}
//         <div>
//             {currentItem.content}
//         </div>
//
//     </div>
// );


export default UseTabs;