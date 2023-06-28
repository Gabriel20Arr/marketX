import React, { useEffect } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import styles from './RecentOrders.module.css';
import { useGetVentasQuery } from '../../../redux/services/ventasApi';
import { formatDistanceToNow } from 'date-fns';

const RecentOrders = () => {
	const { data, refetch } = useGetVentasQuery();
	const ventas = data?.result;

	useEffect(() => {
		refetch();
	}, [refetch]);

	// Ordenar las fechas en orden inverso
	const ventasOrdenadas = ventas?.slice().reverse();

	return (
		<div className={`${styles.container} ${styles.scrollContainer}`}>
			<h1>Ultimas Ventas</h1>
			<ul>
				{ventasOrdenadas?.map((venta, index) => (
					<li key={index} className={`${styles.orderItem} ${styles.hoverItem}`}>
						<div
							className={`${styles.bgPurple} ${styles.rounded} ${styles.p3}`}
						>
							<FaShoppingBag className={styles.textPurple} />
						</div>
						<div className={`${styles.pl4}`}>
							<p className={`${styles.textGray800} ${styles.fontBold}`}>
								${venta.monto}
							</p>
							<p className={`${styles.textGray400} ${styles.textSm}`}>
								{venta.comprador.nombre}
							</p>
						</div>
						<p
							className={`${styles.date} ${styles.textGray400} ${styles.textSm} ${styles.absolute} ${styles.right6}`}
						>
							{formatDistanceToNow(new Date(venta.fecha), { addSuffix: true })}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RecentOrders;
