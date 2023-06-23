'use client';

import React, { useState, useEffect } from 'react';
import styles from './TopCards.module.css';
import { useGetUsersQuery } from '../../../redux/services/userApi';

function TopCards() {
	const [users, setUsers] = useState([]);
	const [previousUserCount, setPreviousUserCount] = useState(0);
	const [roundedPercentageChange, setRoundedPercentageChange] = useState(0);

	const { data, refetch } = useGetUsersQuery(null);
	useEffect(() => {
		refetch();
	}, []);
	console.log(data);

	useEffect(() => {
		if (data) {
			const currentUserCount = data.length;
			let percentageChange = 0;
			if (previousUserCount !== 0) {
				percentageChange =
					((currentUserCount - previousUserCount) / previousUserCount) * 100;
			}
			// Round to 1 decimal place
			const roundedPercentageChange = Math.round(percentageChange * 10) / 10;
			console.log(roundedPercentageChange);
			setRoundedPercentageChange(roundedPercentageChange);
			setPreviousUserCount(currentUserCount);
		}
	}, [data]);

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>$4.200</p>
						<p className={styles.cardDescription}>Ingresos Diarios</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>+18%</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>$4.200.000</p>
						<p className={styles.cardDescription}>Ingresos Anuales</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>+18%</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>{data ? data.length : 0}</p>
						<p className={styles.cardDescription}>Usuarios</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>
							{data ? `${roundedPercentageChange}%` : '+0%'}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopCards;
