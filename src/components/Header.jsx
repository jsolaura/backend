import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import './css/header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";


function Header() {
    const [searchVisible, setSearchVisible] = useState(false);
    const onClick = () => {
        setSearchVisible(true);
    }
    const onMouseOut = () => {
        setSearchVisible(false);
    }
    return (
        <header className="header">
            <button type="button" className="ham"><FontAwesomeIcon icon={faBars} /></button>
            <img className="mainLogo" alt="logoImage" src="image/logo_splash.png"/>
            <nav>
                <ul className="gnb">
                    <li><NavLink to="/">Main</NavLink></li>
                    <li><NavLink to="/todo">TodoList</NavLink></li>
                    <li><NavLink to="/ticket">Ticket</NavLink></li>
                    <li><NavLink to="/module">Module</NavLink></li>
                </ul>
                <span onClick={onClick}>
                    <FontAwesomeIcon className={`searchIcon ${searchVisible ? "inactive" : ""}`} icon={faSearch} />
                </span>
                <input type="text" onMouseOut={onMouseOut} className={`searchInput ${searchVisible ? "active" : ""}`} placeholder="검색어를 입력해주세요" />
            </nav>
        </header>
    )
}

export default Header;