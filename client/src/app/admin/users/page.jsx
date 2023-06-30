'use client'

import React, { useState } from 'react';
import { useGetUsersQuery, usePutUserCarMutation } from '../../../redux/services/userApi';
import styles from './users.module.css';
import { useDispatch } from 'react-redux';
import { addBlockedUser } from '../../../redux/features/blockedUsersSlice';
import axios from 'axios';
require('dotenv').config()

const { LOCALHOST } = process.env;

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
    await axios.put(`https://marketx-production.up.railway.app/usuario/editar`, {_id, rol: 'baneado'})
    refetch();
  };

  const desbanearUser = async (_id) => {
    await axios.put(`https://marketx-production.up.railway.app/usuario/editar`, {_id, rol: 'usuario'})
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
      await axios.put(`https://marketx-production.up.railway.app/usuario/editar`, {...editedUser, _id: editingUserId})
      
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

  const addUser = () => {
    setAddingUser(true);
  };

  const cancelAdd = () => {
    setNewUser({
      nombre: '',
      correo: '',
      rol: '',
      telefono: '',
      direccion: '',
      codigo_postal: '',
    });
    setAddingUser(false);
  };

  const saveNewUser = async () => {
    try {
      // Realiza una solicitud HTTP al backend para guardar el nuevo usuario
      await axios.post('https://marketx-production.up.railway.app/users', newUser);

      setNewUser({
        nombre: '',
        correo: '',
        rol: '',
        telefono: '',
        direccion: '',
        codigo_postal: '',
      });
      setAddingUser(false);
      refetch();
    } catch (error) {
      console.log('Error adding user:', error);
    }
  };

  const handleNewUserInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching users.</div>;
  }

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={addUser}>
          Add User
        </button>
      </div>
      <table className={styles.userTable}>
        {/* Renderizar la lista de usuarios */}
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
              <button onClick={() => desbanearUser(user._id)}>Desbanear</button>
                : 
              <button onClick={() => blockUser(user._id)}>Banear</button> 

              }
            </td>
          </tr>
        ))}
      </table>

      {editingUserId && (
        <div className={styles.editUserForm}>
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
              <select id='rol' name='rol' value={editedUser.rol} onChange={handleInputChange}>
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
            <div>
              <button onClick={saveChanges}>Guardar</button>
              <button onClick={cancelEdit}>Cancelar</button>
            </div>
          </form>
        </div>
      )}

      {addingUser && (
        <div className={styles.addUserForm}>
          <h2>Agregar Usuario</h2>
          <form>
            <div>
              <label htmlFor='nombre'>Nombre:</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={newUser.nombre}
                onChange={handleNewUserInputChange}
              />
            </div>
            <div>
              <label htmlFor='correo'>Correo:</label>
              <input
                type='email'
                id='correo'
                name='correo'
                value={newUser.correo}
                onChange={handleNewUserInputChange}
              />
            </div>
            <div>
              <label htmlFor='rol'>Rol:</label>
              <select id='rol' name='rol' value={newUser.rol} onChange={handleNewUserInputChange}>
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
                value={newUser.telefono}
                onChange={handleNewUserInputChange}
              />
            </div>
            <div>
              <label htmlFor='direccion'>Dirección:</label>
              <input
                type='text'
                id='direccion'
                name='direccion'
                value={newUser.direccion}
                onChange={handleNewUserInputChange}
              />
            </div>
            <div>
              <label htmlFor='codigo_postal'>Código Postal:</label>
              <input
                type='text'
                id='codigo_postal'
                name='codigo_postal'
                value={newUser.codigo_postal}
                onChange={handleNewUserInputChange}
              />
            </div>
            <div>
              <button onClick={saveNewUser}>Guardar</button>
              <button onClick={cancelAdd}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserList;