'use client';

import React, { useState, useEffect } from 'react';
import styles from './TopCards.module.css';
import { useGetUsersQuery } from '../../../redux/services/userApi';
import { useGetVentasQuery } from '../../../redux/services/ventasApi';
import { usePrevious } from './usePrevious.jsx';

function TopCards() {
	const [previousUserCount, setPreviousUserCount] = useState(0);
	const [roundedPercentageChange, setRoundedPercentageChange] = useState(0);
	const { data: usersData, refetch: refetchUsers } = useGetUsersQuery(null);
	const { data: ventasData, refetch: refetchVentas } = useGetVentasQuery(null);
	const ventas = ventasData?.result;

	const prevUserCount = usePrevious(usersData?.length);

	useEffect(() => {
		refetchUsers();
		refetchVentas();
	}, [refetchUsers, refetchVentas]);

	useEffect(() => {
		if (usersData) {
			const currentUserCount = usersData.length;
			let percentageChange = 0;
			if (prevUserCount !== undefined && prevUserCount !== null) {
				percentageChange =
					((currentUserCount - prevUserCount) / prevUserCount) * 100;
			}
			const roundedPercentageChange = Math.round(percentageChange * 10) / 10;
			setRoundedPercentageChange(roundedPercentageChange);
			setPreviousUserCount(currentUserCount);
		}
	}, [usersData, prevUserCount]);

	const calculateAnnualIncome = () => {
		if (ventas) {
			const currentYear = new Date().getFullYear();
			let totalAnnualIncome = 0;
			ventas.forEach((venta) => {
				const ventaYear = new Date(venta.fecha).getFullYear();
				if (ventaYear === currentYear) {
					totalAnnualIncome += parseFloat(venta.monto);
				}
			});
			return totalAnnualIncome;
		}
		return 0;
	};

	const annualIncome = calculateAnnualIncome();

	const calculateDailyIncome = () => {
		if (ventas) {
			const currentDate = new Date().toLocaleDateString('es-ES');
			let totalDailyIncome = 0;

			ventas.forEach((venta) => {
				const fecha = new Date(venta.fecha).toLocaleDateString('es-ES');

				if (fecha === currentDate) {
					totalDailyIncome += parseFloat(venta.monto);
				}
			});

			return totalDailyIncome;
		}

		return 0;
	};

	const calculatePercentageChange = () => {
		if (prevUserCount !== undefined && prevUserCount !== null) {
			const diff = usersData.length - prevUserCount;
			return diff === 0 ? '+0' : `${diff > 0 ? '+' : ''}${diff}`;
		}
		return '+0';
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>${calculateDailyIncome()}</p>
						<p className={styles.cardDescription}>Ventas Diarias</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>
							{calculatePercentageChange()}%
						</span>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>${annualIncome}</p>
						<p className={styles.cardDescription}>Ventas Anuales</p>
					</div>
				</div>
			</div>
			<div className={styles.card}>
				<div className={styles.cardContent}>
					<div className={styles.cardInfo}>
						<p className={styles.cardTitle}>
							{usersData ? usersData.length : 0}
						</p>
						<p className={styles.cardDescription}>Usuarios</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>
							{calculatePercentageChange()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopCards;
