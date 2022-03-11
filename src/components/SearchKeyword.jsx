import React, {useEffect, useState} from 'react';
import styles from './css/Search.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";


const SearchKeyword = ({ value, onChange, onClick, placeholder }) => {
    return (
        <div className={styles.searchWrap}>
            <span><FontAwesomeIcon icon={faSearch} className={styles.searchIcon} /></span>
            <input value={value}
                   onChange={onChange}
                   type={"text"}
                   placeholder={placeholder}
                   className={styles.searchKeyword}
            />
            <button className={styles.searchBtn} onClick={onClick}>검색</button>
        </div>
    );
};

export default SearchKeyword;