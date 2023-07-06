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
import { enviarNotificacionPorCorreo } from '@/src/hooks/enviarCorreo';



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



  const blockUser = async (_id, correo, nombre) => {
    await axios.put("https://marketx-production.up.railway.app/usuario/editar", {_id, rol: 'baneado'})
    refetch();
    const asunto = "Notificación de bloqueo de usuario en MarketX";
    const mensaje = `Estimado/a ${nombre}\n

    Espero que este mensaje te encuentre bien. Me pongo en contacto contigo para informarte que, lamentablemente, he decidido bloquearte en nuestra aplicación MarketX.\n
    
    He tomado esta medida. Quiero asegurarme de mantener un ambiente seguro y respetuoso para todos los usuarios de la aplicación, y desafortunadamente, tus acciones recientes han infringido nuestras políticas y normas comunitarias.\n
    
    Por favor, ten en cuenta que como resultado del bloqueo, no podrás acceder a la aplicación ni interactuar con otros usuarios. Te insto a respetar esta decisión y a reconsiderar tus acciones para evitar problemas similares en el futuro.\n
    
    Si tienes alguna pregunta o deseas discutir esta situación más a fondo, te animo a que me contactes directamente a través de este correo electrónico. Estoy dispuesto/a a escuchar tu perspectiva y abordar cualquier inquietud que puedas tener.\n
    
    Agradezco tu comprensión y cooperación en este asunto. Espero que puedas reflexionar sobre tus acciones y tomar medidas para mejorar en tus interacciones dentro de la comunidad de la aplicación.\n
    
    Saludos cordiales,\n
    
    MarketX`;
    const correoEnviado = enviarNotificacionPorCorreo(
      correo,
      asunto,
      mensaje
    );
  };

  const desbanearUser = async (_id,correo,nombre) => {
    await axios.put("https://marketx-production.up.railway.app/usuario/editar", {_id, rol: 'usuario'})
    refetch();
    const asunto = "Notificación de desbloqueo de usuario en MarketX";
    const mensaje = `Estimado/a ${usuario.nombre},\n

    Espero que este mensaje te encuentre bien. Me pongo en contacto contigo para informarte que hemos tomado la decisión de desbloquear tu cuenta de usuario en nuestra aplicación MarketX.\n
    
    Después de una revisión adicional y considerando las circunstancias, hemos determinado que tu cuenta cumple con nuestras políticas y normas comunitarias. Reconocemos y agradecemos tus esfuerzos por ajustar tus acciones y comportamiento de acuerdo con nuestras directrices.\n
    
    Como resultado de este desbloqueo, tendrás pleno acceso nuevamente a todas las funciones de la aplicación y podrás interactuar con otros usuarios como antes. Te animamos a seguir respetando nuestras políticas y a participar de manera positiva en la comunidad de MarketX.\n
    
    Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en contactar a nuestro equipo de soporte a través de este correo electrónico. Estaremos encantados de ayudarte en cualquier consulta o inquietud que puedas tener.\n
    
    Agradecemos tu comprensión y cooperación durante este proceso. Valoramos tu compromiso con la comunidad de MarketX y esperamos que esta experiencia te motive a mantener una conducta apropiada y respetuosa en nuestra plataforma.\n
    
    Saludos cordiales,\n
    
    MarketX`;
    const correoEnviado = enviarNotificacionPorCorreo(
      correo,
      asunto,
      mensaje
    );
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
      await axios.post("https://marketx-production.up.railway.app/users", newUser);

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

      <div className={styles.container2}>
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
              <button onClick={() => desbanearUser(user._id, user.correo, user.nombre)}>Desbanear</button>
                : 
              <button onClick={() => blockUser(user._id, user.correo, user.nombre)}>Banear</button> 

              }
            </td>
          </tr>
        ))}
      </table>
      </div>

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