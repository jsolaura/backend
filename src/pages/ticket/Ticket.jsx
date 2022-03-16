import React, {useState} from "react";
import TicketOrder from "./TicketOrder";
import styles from './Ticket.module.css';


function Ticket () {

    return (
        <>
            <h2 className={styles.ticketTitle}>Ticket Order</h2>
            <TicketOrder />
        </>
    )
}

export default Ticket;