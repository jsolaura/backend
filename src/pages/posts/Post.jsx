import React from "react";
import './post.css';
import PostsTemplate from "./PostsTemplate";
import TicketOrder from "./TicketOrder";
import styles from './Ticket.module.css';

function Post () {
    return (
        <>
            <h2 className={`ticketTitle ${styles.ticketTitle}`}>Ticket Order</h2>
            <TicketOrder />
            {/*<PostsTemplate />*/}
        </>
    )
}

export default Post;