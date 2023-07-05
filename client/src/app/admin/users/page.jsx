'use client'

import React, { useState } from 'react';
import { useGetUsersQuery, usePutUserCarMutation } from '../../../redux/services/userApi';
import styles from './users.module.css';
import { useDispatch } from 'react-redux';
import { addBlockedUser } from '../../../redux/features/blockedUsersSlice';
import axios from 'axios';
import Loading from '@/src/components/Loaders/Loaders';
import "sweetalert2/src/sweetalert2.scss";
import Swal from "sweetalert2/dist/sweetalert2.js";
import Link from 'next/link';


const UserList = () => {
  const { data, isLoading, isError, refetch } = useGetUsersQuery(); // Eliminamos el valor null en useGetUsersQuery

  const [editingUserId, setEditingUserId] = useState(null);

  const [editedUser, setEditedUser] = useState({
    nombre: '',
    correo: '',
    rol: '',
    telefono: '',
    direccion: '',
    codigo_postal: '',
  });
  
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    nombre: '',
    correo: '',
    rol: '',
    telefono: '',
    direccion: '',
    codigo_postal: '',
  });

  const [updateUser] = usePutUserCarMutation();

  const blockUser = async (_id) => {
    await axios.put("https://marketx-production.up.railway.app/usuario/editar", {_id, rol: 'baneado'})
    refetch();
  };

  const desbanearUser = async (_id) => {
    await axios.put("https://marketx-production.up.railway.app/usuario/editar", {_id, rol: 'usuario'})
    refetch();
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

  const saveChanges = async (e) => {
    try {
      e.preventDefault()
      await axios.put("https://marketx-production.up.railway.app/usuario/editar", {...editedUser, _id: editingUserId})
      
      setEditingUserId(null);
      setEditedUser({
        nombre: '',
        correo: '',
        rol: '',
        telefono: '',
        direccion: '',
        codigo_postal: '',
      });
      refetch()
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
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return (
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error fetching users",
        showConfirmButton: false,
      })
      )
    }
    
    return (
    <div>
    	
      <Link href='/admin' className={styles.link}>
				Volver
			</Link>
      
      <div className={styles.contenedorTitulo}>
				<h1 className={styles.titulo}>Lista de Usuarios</h1>
			</div>
 
      <table className={styles.userTable}>
        {/* Renderizar la lista de usuarios */}
        <thead>
					<tr>
						<th>Usuario</th>
						<th>Email</th>
						<th>Rol</th>
						<th>Teléfono</th>
						<th>Dirección</th>
						<th>codigo Postal</th>
						<th>Acciones</th>
					</tr>
				</thead>
        {data.map((user) => (
          <tr key={user._id}>
            <td>{user.nombre}</td>
            <td>{user.correo}</td>
            <td>{user.rol}</td>
            <td>{user.telefono}</td>
            <td>{user.direccion}</td>
            <td>{user.codigo_postal}</td>
            <td>
              <button onClick={() => editUser(user._id)}>Editar</button>
              { (user.rol === "baneado") ?
              <button onClick={() => desbanearUser(user._id)}>Bloquear</button>
                : 
              <button onClick={() => blockUser(user._id)}>Desbloquear</button> 

              }
            </td>
          </tr>
        ))}
      </table>

      {editingUserId && (
        <div className={styles.editUserForm}>
            <div className={styles.editUserForm2}>
              <h2 className={styles.nameEdit}>Editar Usuario</h2>
              <form className={styles.editForm}>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='nombre'>Nombre:</label>
                  <input
                    type='text'
                    id='nombre'
                    name='nombre'
                    value={editedUser.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='correo'>Correo:</label>
                  <input
                    type='email'
                    id='correo'
                    name='correo'
                    value={editedUser.correo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='rol'>Rol:</label>
                  <select id='rol' name='rol' value={editedUser.rol} onChange={handleInputChange}>
                    <option value='admin'>admin</option>
                    <option value='user'>usuario</option>
                  </select>
                </div>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='telefono'>Teléfono:</label>
                  <input
                    type='tel'
                    id='telefono'
                    name='telefono'
                    value={editedUser.telefono}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='direccion'>Dirección:</label>
                  <input
                    type='text'
                    id='direccion'
                    name='direccion'
                    value={editedUser.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.Edit}>
                  <label className={styles.EditLabel} htmlFor='codigo_postal'>Código Postal:</label>
                  <input
                    type='text'
                    id='codigo_postal'
                    name='codigo_postal'
                    value={editedUser.codigo_postal}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
                <div>
                  <button className={styles.EditB} onClick={saveChanges}>Guardar</button>
                  <button className={styles.EditB} onClick={cancelEdit}>Cancelar</button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default UserList;