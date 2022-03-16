import React, {useEffect, useState} from 'react';
import Loader from "../../components/Loader";
import TicketItem from "./TicketItem";
import styles from './Ticket.module.css';
import Paging from "../../components/Paging";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchKeyword from "../../components/search/SearchKeyword";
import TicketSkeleton from "../../components/skeleton/TicketSkeleton";

const TicketOrder = () => {
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState([]);
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState(false);

    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const getTicketOrder = async () => {
        setLoading(true);
        new Promise(res => {
            setTimeout(() => {
                res();
            }, 500);
        }).then(() => {
            axios.get("http://localhost:8080/api/ticket/order")
                .then(res => {
                    setTicket(res.data);
                    setTimeout(() => setLoading(false), 100);
                })
        })
    }

    useEffect(()=>{
        getTicketOrder();
        setPage(JSON.parse(window.localStorage.getItem('page')));
    },[])

    useEffect(() => {
        getTicketOrder();
        window.localStorage.setItem('page', page);
    }, [page]);



    const onChange = (e) => {
        setValue(e.target.value);
        setFiltered(true);
        if (value === "" || value == null) {
            setFiltered(false);
        }
    }
    const onClick = () => {
        setLoading(true);
        setFiltered(true);
        setPage(1);
        // setPage(JSON.parse(window.localStorage.getItem('page')));

        setTimeout(() => {
            setLoading(false)
            setTicket(ticket.filter(item => item.name.toLowerCase().includes(value)));
        }, 500);
        setValue("");

        if (value === "" || value == null) {
            setFiltered(false);
            setTicket(ticket);
            getTicketOrder();
        }
    }

    return (
        <>
            <SearchKeyword value={value} onChange={onChange} onClick={onClick} placeholder={"전시 이름을 입력해주세요 !"} />
            {loading
                ?
                <div className={styles.skeletonWrap}>
                    { new Array(10).fill(1).map((_, i) => {
                        return <TicketSkeleton key={i}/>;
                    })}
                </div>
                :
                <>
                <div className={styles.ticketList}>
                    { filtered ?
                        ticket.filter(item => item.name.toLowerCase().includes(value)).slice(offset, offset + limit).map(filteredItem => (
                            <TicketItem props={filteredItem} key={filteredItem.id} />
                        )) :
                        ticket.slice(offset, offset + limit).map((item) => <TicketItem props={item} key={item.id} />)
                    }
                </div>
                <Paging total={ticket.length} limit={limit} page={page} setPage={setPage} />
                </>
            }
        </>
    );
};

export default TicketOrder;