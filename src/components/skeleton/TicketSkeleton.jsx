import React from 'react';
import styles from "../../pages/posts/Ticket.module.css";

const TicketSkeleton = () => {
    return (
        <>
            <div className={styles.ticketItem}>
                <img src={""} alt={"skeleton"} />
                <div className={styles.ticketInfo}>
                    <h5 className={styles.skeletonBox} />
                    <p className={styles.skeletonBox} />
                    <p className={styles.skeletonBox} />
                    <span className={styles.skeletonBox} />
                </div>
            </div>
        </>
    );
};

export default TicketSkeleton;