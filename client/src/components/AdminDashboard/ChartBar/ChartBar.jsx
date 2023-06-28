'use client';

import React, { useEffect, useState } from 'react';
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
import { useGetVentasQuery } from '../../../redux/services/ventasApi';
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
	const { data, refetch } = useGetVentasQuery(null);
	const ventas = data?.result;

	const [chartData, setChartData] = useState({ datasets: [] });
	const [chartOptions, setChartOptions] = useState({});

	useEffect(() => {
		refetch();
	}, [refetch]);

	useEffect(() => {
		if (ventas) {
			const ventasPorDia = {};
			ventas.forEach((venta) => {
				const fecha = new Date(venta.fecha).toLocaleDateString('es-ES');
				const monto = +venta.monto;

				if (ventasPorDia[fecha]) {
					ventasPorDia[fecha] += monto;
				} else {
					ventasPorDia[fecha] = monto;
				}
			});

			const labels = Object.keys(ventasPorDia);
			const datos = Object.values(ventasPorDia);

			setChartData({
				labels: labels,
				datasets: [
					{
						label: 'Ventas $',
						data: datos,
						borderColor: 'rgb(53, 162, 235)',
						backgroundColor: 'rgb(53, 162, 235, 0.4)',
					},
				],
			});
		}

		setChartOptions({
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Ventas Diarias',
				},
			},
		});
	}, [ventas]);

	return (
		<div className={`${styles.container} ${styles.chartContainer}`}>
			<Bar data={chartData} options={chartOptions} />
		</div>
	);
}

export default ChartBar;
