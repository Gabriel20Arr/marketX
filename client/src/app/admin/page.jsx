'use client';

import React from 'react';
import styles from './Admin.module.css';
import Header from '../../components/AdminDashboard/Header/Header';
import TopCards from '../../components/AdminDashboard/TopCards/TopCards';
import ChartBar from '../../components/AdminDashboard/ChartBar/ChartBar';
import RecentOrders from '../../components/AdminDashboard/RecentOrders/RecentOrders';
import SideBar from '../../components/AdminDashboard/SideBar/SideBar';
import { useSession } from 'next-auth/react';
import Loading from '../../components/Loaders/Loaders';

const Admin = () => {
	const { state } = useSession();
	if (state === 'loading') {
		return <Loading />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.sideBar}>
				<SideBar />
			</div>
			<div className={styles.content}>
				<div className={styles.header}>
					<Header />
				</div>
				<div className={styles.main}>
					<div className={styles.topCharts}>
						<TopCards />
					</div>
					<div className={styles.chartAndOrders}>
						<div className={styles.chartBar}>
							<ChartBar />
						</div>
						<div className={styles.recentOrders}>
							<RecentOrders />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Admin;
