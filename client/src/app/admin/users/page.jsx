'use client';

import React, { useState, useEffect } from 'react';
import {
	useGetUsersQuery,
	usePutUserCarMutation,
} from '../../../redux/services/userApi';
import styles from './users.module.css';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addBlockedUser } from '../../../redux/features/blockedUsersSlice';
import axios from 'axios';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [editingUserId, setEditingUserId] = useState(null);
	const [editedUser, setEditedUser] = useState({
		nombre: '',
		correo: '',
		rol: '',
		telefono: '',
		direccion: '',
		codigo_postal: '',
	});

	const { data, refetch } = useGetUsersQuery(null);
	useEffect(() => {
		refetch();
	}, []);
	console.log(data);

	const dispatch = useDispatch();
	const [updateUser] = usePutUserCarMutation();

	const blockUser = (userId, userEmail) => {
		// Lógica para bloquear al usuario

		// Guardar el correo electrónico bloqueado en el estado global
		dispatch(addBlockedUser(userEmail));
	};

	const editUser = (userId) => {
		setEditingUserId(userId);
		const userToEdit = data.find((user) => user._id === userId);
		setEditedUser(userToEdit);
	};

	const cancelEdit = () => {
		setEditingUserId(null);
		setEditedUser({
			nombre: '',
			correo: '',
			rol: '',
			telefono: '',
			direccion: '',
			codigo_postal: '',
		});
	};

	const saveChanges = async () => {
		try {
			await updateUser({ body: { id: editingUserId, ...editedUser } });

			// Realiza una solicitud HTTP al backend para guardar los cambios
			await axios.put(`http://localhost:3001/`, editedUser);

			setEditingUserId(null);
			setEditedUser({
				nombre: '',
				correo: '',
				rol: '',
				telefono: '',
				direccion: '',
				codigo_postal: '',
			});
			refetch();
		} catch (error) {
			console.log('Error updating user:', error);
		}
	};

	const handleInputChange = (e) => {
		setEditedUser({
			...editedUser,
			[e.target.name]: e.target.value,
		});
	};

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
								{editingUserId === user._id ? (
									<>
										<button onClick={saveChanges}>Guardar cambios</button>
										<button onClick={cancelEdit}>Cancelar</button>
									</>
								) : (
									<>
										<button onClick={() => editUser(user._id)}>Editar</button>
										<button onClick={() => blockUser(user._id, user.correo)}>
											Bloquear
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{editingUserId && (
				<div>
					<h2>Editar Usuario</h2>
					<form>
						<div>
							<label htmlFor='nombre'>Nombre:</label>
							<input
								type='text'
								id='nombre'
								name='nombre'
								value={editedUser.nombre}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor='correo'>Correo:</label>
							<input
								type='email'
								id='correo'
								name='correo'
								value={editedUser.correo}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor='rol'>Rol:</label>
							<select
								id='rol'
								name='rol'
								value={editedUser.rol}
								onChange={handleInputChange}
							>
								<option value='admin'>admin</option>
								<option value='user'>usuario</option>
							</select>
						</div>
						<div>
							<label htmlFor='telefono'>Teléfono:</label>
							<input
								type='tel'
								id='telefono'
								name='telefono'
								value={editedUser.telefono}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor='direccion'>Dirección:</label>
							<input
								type='text'
								id='direccion'
								name='direccion'
								value={editedUser.direccion}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor='codigo_postal'>Código Postal:</label>
							<input
								type='text'
								id='codigo_postal'
								name='codigo_postal'
								value={editedUser.codigo_postal}
								onChange={handleInputChange}
							/>
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default UserList;
