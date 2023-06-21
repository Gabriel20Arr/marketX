'use client';

import { useGetProductsByIdQuery } from '@/src/redux/services/productApi';
import styles from './detail.module.css';
import Link from 'next/link';

export default function Detail({ params }) {
	const { detail } = params;
	const { data, error, isLoading, isFetching } = useGetProductsByIdQuery({
		id: detail,
	});

	if (isLoading || isFetching) return <p>Loading...</p>;
	if (error) return <p>Ha habido un error, vuelve a intentarlo más tarde</p>;

	return (
		<div className={styles.container}>
			<div className={styles.backLink}>
				<Link href='/home'>Atrás</Link>
			</div>

			<div className={styles.image}>
				<img src={data.imagen} alt='error cargando la imagen' />
			</div>

			<div className={styles.details}>
				<div>
					<p className={styles.title}>{data.titulo}</p>
				</div>

				<div>
					<p className={styles.price}>Precio: ${data.precio}</p>
				</div>

				<div>
					<p className={styles.category}>Categoría: {data.categoria}</p>
				</div>
			</div>

			<div className={styles.description}>
				<p>Descripción:</p>
				<p>{data.descripcion}</p>
			</div>
		</div>
	);
}
