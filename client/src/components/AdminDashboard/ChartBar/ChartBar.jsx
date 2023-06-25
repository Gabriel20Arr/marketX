'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import styles from './ChartBar.module.css';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function ChartBar() {
	const [chartData, setChartData] = useState({ datasets: [] });
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		setChartData({
			labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'],
			datasets: [
				{
					label: 'Sales $',
					data: [18127, 22201, 19490, 17938, 24182, 17842, 22475],
					borderColor: 'rgb(53, 162, 235)',
					backgroundColor: 'rgb(53, 162, 235, 0.4',
				},
			],
		});
		setChartOptions({
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Daily Revenue',
				},
			},
			// maintainAspectRatio: false,
			// responsive: true,
		});
	}, []);

	return (
		<>
			<div className={`${styles.container} ${styles.chartContainer}`}>
				<Bar data={chartData} options={chartOptions} />
			</div>
		</>
	);
}

export default ChartBar;
