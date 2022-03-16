import React from 'react';
import styles from './Skeleton.module.css';

const TicketSkeleton = () => {
    return (
        <div className={styles.skeletonItem}>
            <div className={styles.skeletonImg} />
            <div className={styles.skeletonContainer}>
                <h5 className={styles.skeletonBox} />
                <p className={styles.skeletonBox} />
                <p className={styles.skeletonBox} />
                <span className={styles.skeletonBox} />
            </div>
        </div>
    );
};

export default TicketSkeleton;