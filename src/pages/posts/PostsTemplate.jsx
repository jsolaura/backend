import React, {useEffect, useState} from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

import PostItemsList2 from "./PostItemsList2";
import Pagination from "components/Pagination";

import {Link, useLocation} from "react-router-dom";
import Payment from "../../components/Payment";
// https://jsonplaceholder.typicode.com/photos

const PostsTemplate = () => {

    // reload => 페이지 유지 기능
    // 검색 기능


   let location = useLocation();



    // 쌓이는 데이터
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    // 보여지는 첫 기본 페이지 세팅
    const [currentPage, setCurrentPage] = useState(1);
    // 페이지 안에 노출되는 데이터 개수
    const [postsPerPage, setPostsPerPage] = useState(8);
    // 보여지는 페이지 리스트 개수
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
            setPosts(response.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    // 마지막과 첫번 째
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;

    const pages = [];
    // 페이지의 갯수에 따라 item들을 배열로 넣어줌
    for (let i = 1; i <= Math.ceil(posts.length); i++) {
        pages.push(i);
    }

    function currentPosts(tmp) {
        let currentPosts = 0;
        currentPosts = tmp.slice(indexOfFirst, indexOfLast);
        return currentPosts;
    }

    const handleClick = (e) => {
        setCurrentPage(Number(e.target.id));
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    }
    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNext}> &hellip; </li>
    }
    let pageDecrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageDecrementBtn = <li onClick={handlePrev}> &hellip; </li>
    }

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li key={number} id={number} onClick={handleClick} className={currentPage == number ? "active" : null}>
                    {number}
                </li>
            );
        } else {
            return null;
        }

    });

    const loadMoreBlock = (e) => {
        e.target.parentElement.classList.toggle('active');
        console.log(e.target.parentElement)
    }
    const handleMore10 = (e) => {
        // if ()
            console.log(e.target)
        setPostsPerPage(postsPerPage + 10);
    }
    const handleMore20 = () => {
        setPostsPerPage(postsPerPage + 20);
    }


    return (
        <div className="postWrap">
            <div className="postHeader">
                <ul className="loadMore" onClick={loadMoreBlock}>
                    <li>정렬</li>
                    <li className="arr10" onClick={handleMore10}>10개씩 보기</li>
                    <li className="arr20" onClick={handleMore20}>20개씩 보기</li>
                </ul>
                <Link to="/post/write" className="postWrite">등록하기</Link>
            </div>
            <PostItemsList2 posts={currentPosts(posts)} loading={loading}></PostItemsList2>
            <ul className="pageNumber">
                <li>
                    <button
                        onClick={handlePrev}
                        disabled={currentPage == pages[0] ? true : false}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li>
                    <button
                        onClick={handleNext}
                        disabled={currentPage == pages[pages.length - 1] ? true : false}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </li>
            </ul>

            {/*<Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage}></Pagination>*/}
        </div>
    )
}

export default PostsTemplate;