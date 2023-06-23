'use client';

import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from '../../../redux/services/userApi';
import styles from './users.module.css';
import Link from 'next/link';

const UserList = () => {
	const [users, setUsers] = useState([]);

	const { data, refetch } = useGetUsersQuery(null);
	useEffect(() => {
		refetch();
	}, []);
	console.log(data);

	return (
		<div>
			<Link href='/admin' className={styles.link}>
				Volver
			</Link>
			<h1>Lista de Usuarios</h1>
			<div className={styles.addButtonContainer}>
				<button
					className={styles.addButton}
					onClick={() => console.log('Add User')}
				>
					Add User
				</button>
			</div>
			<table className={styles.userTable}>
				<thead>
					<tr>
						<th>ID</th>
						<th>NOMBRE</th>
						<th>CORREO</th>
						<th>ROL</th>
						<th>TELÉFONO</th>
						<th>DIRECCIÓN</th>
						<th>CP</th>
						<th>ACCIONES</th>
					</tr>
				</thead>
				<tbody>
					{data?.map((user) => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.nombre}</td>
							<td>{user.correo}</td>
							<td>{user.rol}</td>
							<td>{user.telefono}</td>
							<td>{user.direccion}</td>
							<td>{user.codigo_postal}</td>
							<td>
								<button onClick={() => editUser(user._id)}>Editar</button>
								<button onClick={() => blockUser(user._id)}>Bloquear</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default UserList;
