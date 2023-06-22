'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useGetUsersQuery} from "../../../redux/services/userApi"

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		try {
			const response = await axios.get('http://localhost:3001/Usuario'); // Ruta de la API para obtener la lista de usuarios
			setUsers(response.data);
		} catch (error) {
			console.error('Error fetching users:', error);
		}
	};

	const {data, refetch} = useGetUsersQuery(null);
  useEffect(()=>{
    refetch();
  },[])
  console.log(data);

	// const deleteUser = async (userId) => {
	// 	try {
	// 		await axios.delete(`http://localhost:3001/eliminar/${userId}`); // Ruta de la API para eliminar un usuario
	// 		fetchUsers(); // Actualiza la lista de usuarios después de eliminar uno
	// 	} catch (error) {
	// 		console.error('Error deleting user:', error);
	// 	}
	// };

	// const deleteUser = async (userId) => {
	// 	try {
	// 	  await axios.delete(`http://localhost:3001/eliminar/${userId}`);
	// 	  fetchUsers();
	// 	} catch (error) {
	// 	  console.error('Error deleting user:', error);
	// 	}
	//   };



	  return (
		<div>
		  <h1>User List</h1>
		  <button onClick={() => console.log('Add User')}>Add User</button>
		  <ul>
			{data?.map((user) => (
			  <li key={user._id}> {/* Utilizar user._id en lugar de user.id */}
				<p>{user.correo}</p>
				<button onClick={() => console.log('Edit User:', user._id)}>Edit</button>
				<button onClick={() => console.log('View Details:', user._id)}>View Details</button>
				<button onClick={() => deleteUser(user._id)}>Delete</button> {/* Utilizar user._id en deleteUser */}
			  </li>
			))}
		  </ul>
		</div>
	  );
};

export default UserList;
