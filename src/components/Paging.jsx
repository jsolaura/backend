import React, {useEffect, useState} from 'react';
import styles from './css/Paging.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
const pagesPerList = 5;

const arrowHandler = (prev, sign, totalPage) => {
    const nextIndex = prev.end + pagesPerList;
    let res;
    if (sign === 1) {
        res = nextIndex > totalPage ? totalPage : nextIndex;
    } else if (sign === -1) {
        res = prev.end - prev.start < 4
            ? prev.start + 4 - pagesPerList
            : prev.end - pagesPerList;
    }
    return { ...prev, start: prev.start + pagesPerList * sign, end: res }
}

const Paging = ({ total, limit, page, setPage }) => {
    const totalPage = Math.ceil(total / limit);

    const [showingNum, setShowingNum] = useState({
        start: 1,
        end: pagesPerList,
    });
    useEffect(() => {
        const lessThanFive = totalPage >= pagesPerList;
        console.log(lessThanFive);
        lessThanFive
            ? setShowingNum(prev => ({ ...prev, start:  1, end: pagesPerList }))
            : setShowingNum(prev => ({ ...prev, start:  1, end: totalPage }))
    }, [totalPage]);

    const handlePrev = () => {
        page > pagesPerList && setShowingNum(prev => arrowHandler(prev, -1, totalPage))
    }
    const handleNext = () => {
        showingNum.end <= totalPage && setShowingNum(prev => arrowHandler(prev, 1, totalPage))
    }


    return (
        <>
            <nav className={styles.nav}>
                <button className={styles.paginationBtn} onClick={() => {
                    setPage(page - 1)
                    handlePrev();
                }} disabled={page === 1}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                {Array(totalPage)
                    .fill()
                    .map((_, i) => (
                        <button className={styles.paginationBtn}
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </button>
                    ))}
                <button className={styles.paginationBtn} onClick={() => {
                    setPage(page + 1)
                    handleNext()
                }} disabled={page === totalPage}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </button>
            </nav>
        </>
    );
};



export default Paging;