import React from 'react';
import styles from './TopCards.module.css';

function TopCards() {
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
						<p className={styles.cardTitle}>1123</p>
						<p className={styles.cardDescription}>Usuarios</p>
					</div>
					<div className={`${styles.cardBadge} ${styles.greenBackground}`}>
						<span className={styles.cardBadgeText}>+18%</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TopCards;
