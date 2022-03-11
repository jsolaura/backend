import React from 'react';
import PropsType from "prop-types";
import styles from './Ticket.module.css';

function TicketItem({ props }) {
    return (
        <>
            <div className={styles.ticketItem}>
                <img src={props.imageUrl} alt={props.name} />
                <div className={styles.ticketInfo}>
                    <h5>{props.name}</h5>
                    <p>{props.place}</p>
                    <p>{props.startDate} ~ <br/> {props.endDate}</p>
                    <span>{props.earlyBird ? "얼리버드" : "본티켓"}</span>
                </div>
            </div>
        </>
    );
};

TicketItem.propTypes = {
    id: PropsType.number,
    name: PropsType.string,
    imageUrl: PropsType.string,
    place: PropsType.string,
    startDate: PropsType.string,
    endDate: PropsType.string,
    earlyBird: PropsType.bool
}

export default TicketItem;