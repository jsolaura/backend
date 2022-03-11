import React, {useEffect, useState} from 'react';
import Loader from "../../components/Loader";
import TicketItem from "./TicketItem";
import styles from './Ticket.module.css';
import Paging from "../../components/Paging";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SearchKeyword from "../../components/SearchKeyword";

const TicketOrder = () => {
    const [loading, setLoading] = useState(true);
    const [ticket, setTicket] = useState([]);
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState(false);

    const [limit, setLimit] = useState(8);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;

    const getTicketOrder = async () => {
        // const json = await (
        //     await fetch("http://localhost:8080/api/ticket/order")
        // ).json();
        const response = await axios.get("http://localhost:8080/api/ticket/order");
        setTicket(response.data);
        setLoading(false);

    }
    useEffect(() => {
        getTicketOrder();
    }, [])

    const onChange = (e) => {
        setValue(e.target.value);
        setFiltered(false);
        if (value === "" || value == null) {
            setFiltered(false);
        }
    }
    const onClick = () => {
        setFiltered(true);
        setPage(1);
        setTicket(ticket.filter(item => item.name.toLowerCase().includes(value)));
        if (value === "") {
            setFiltered(false);
            getTicketOrder();
            setTicket(ticket);
        }
    }

    return (
        <>
            {loading ? <Loader /> :
                <>
                <SearchKeyword value={value} onChange={onChange} onClick={onClick} placeholder={"전시 이름을 입력해주세요 !"} />
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