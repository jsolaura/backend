import React, {useState} from 'react';
import styles from "../../components/player/Player.module.css";
import {baseUrl} from "../../config";

const Tabs = ({ tabData, onItemSelect }) => {
    const [touched, setTouched] = useState(false);
    const [active, setActive] = useState("");
    const getActiveClass = (tab) => {
        return touched
            ? active === tab
                ? "active"
                : ""
            : tabData[tab].isActive
            ? "active"
            : "";
    };
    console.log({tabData});
    return (
        <div className={styles.tabContainer}>
            <div className={styles.tabHeader}>
                {tabData &&
                    Object.keys(tabData).map((tab, index) => (
                        <a key={index}
                           className={`${getActiveClass(tab)}`}
                           href={`#${tab}`}
                           onClick={() => {
                               setTouched(true);
                               setActive(tab);
                           }}
                        > {tabData[tab].label}
                        </a>)
                    )
                }
            </div>
            <div className={styles.tabContents}>
                {tabData &&
                    Object.keys(tabData).map((tab, index) => (
                        <div
                            key={index}
                            className={`${styles.tabContent} ${getActiveClass(tab)}`}
                            id={`${tab}`}
                        >
                            <div className={styles.contentWrapper}>
                                {tabData[tab].items.map((item, _index) => (
                                    <div
                                        onClick={() => onItemSelect(tab, item.key)}
                                        key={_index}
                                        className={styles.contentItem}
                                    >
                                        <div className={"d-visilibity z-0"}> </div>
                                        <img src={`${baseUrl}/music/${item.key}/${item.key}.jpg`} alt={""}/>
                                        <div className={styles.contentLabel}>
                                            {item.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Tabs;