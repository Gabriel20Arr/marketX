import React from 'react';
import { data } from '../../../api/data';
import { FaShoppingBag } from 'react-icons/fa';
import styles from './RecentOrders.module.css';

const RecentOrders = () => {
	return (
		<div className={`${styles.container} ${styles.scrollContainer}`}>
			<h1>Recent Orders</h1>
			<ul>
				{data.map((order, id) => (
					<li key={id} className={`${styles.orderItem} ${styles.hoverItem}`}>
						<div
							className={`${styles.bgPurple} ${styles.rounded} ${styles.p3}`}
						>
							<FaShoppingBag className={styles.textPurple} />
						</div>
						<div className={`${styles.pl4}`}>
							<p className={`${styles.textGray800} ${styles.fontBold}`}>
								${order.total}
							</p>
							<p className={`${styles.textGray400} ${styles.textSm}`}>
								{order.name.first}
							</p>
						</div>
						<p
							className={`${styles.date} ${styles.textGray400} ${styles.textSm} ${styles.absolute} ${styles.right6}`}
						>
							{order.date}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentOrders;
