'use client';

import { useEffect, useState } from 'react';
import { useGetProductsUsersQuery } from '@/src/redux/services/productApi';
import styles from './misProductos.module.css';
import axios from 'axios';
import Loading from '@/src/components/Loaders/Loaders';
import { useRouter } from "next/navigation";


function MisProductos() {
	const { data, refetch } = useGetProductsUsersQuery();
	const [isLoading, setIsLoadings] = useState(true);
	const [editingProductId, setEditingProductId] = useState(null);
	const [editedProduct, setEditedProduct] = useState({
		precio: '',
		stock: '',
	});

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoadings(true);
			await refetch();
			setIsLoadings(false);
		};
		fetchData();
	}, [refetch]);

	var usuario = {};
	if (typeof window !== 'undefined') {
		const usuarioJSON = localStorage.getItem('usuario');
		usuario = JSON.parse(usuarioJSON);
	}

	const productos = data && data.find((use) => use.nombre === usuario?.correo);

	const editProduct = (productId) => {
		setEditingProductId(productId);
		const productToEdit = data.find((prod) => prod._id === productId);
		setEditedProduct(productToEdit);
	};

	const cancelEdit = () => {
		setEditingProductId(null);
		setEditedProduct({
			precio: '',
			stock: '',
		});
	};

	const saveChanges = async (e) => {
		try {
			e.preventDefault();
			await axios.put(
				"https://marketx-production.up.railway.app/producto/actualizar",
				{
					...editedProduct,
					_id: editingProductId,
				}
			);

			setEditingProductId(null);
			setEditedProduct({
				precio: '',
				stock: '',
			});
			refetch();
		} catch (error) {
			console.log('Error updating product:', error);
		}
	};

	const handleInputChange = (e) => {
		setEditedProduct({
			...editedProduct,
			[e.target.name]: e.target.value,
		});
	};

	const goBack = () => {
		router.back();
	  };

	return (
		<div className={styles.contenedor1}>

			<div >
       			 <button onClick={goBack} className={styles.link}>Volver</button>
      		</div>
			<div className={styles.contenedor1_1}>

			<div className={styles.contenedorTitulo}>
				<h1 className={styles.titulo}>Mis Productos</h1>
			</div>
			</div>

			<div className={styles.contenedor2}>

			
			{isLoading ? (
				<Loading />
			) : productos &&
			  Array.isArray(productos.productos) &&
			  productos.productos.length > 0 ? (
				<table className={styles.userTable}>
					<thead>
						<tr>
							<th>Imagen</th>
							<th>Título</th>
							<th>Categoría</th>
							<th>Precio</th>
							<th>Stock</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						{productos.productos?.map((producto) => (
							<tr key={producto._id}>
								<th><img src={producto.imagen} alt={producto.titulo} style={{width:"70px"}}/></th>
								<td>{producto.titulo}</td>
								<td>{producto.categoria}</td>
								<td>{producto.precio}</td>
								<td>{producto.stock}</td>
								<td className={styles.Cbtn} >
									<button className={styles.btn}  onClick={() => editProduct(producto._id)}>
										Editar
									</button>
									<button className={styles.btn} onClick={() => deleteProduct(producto._id)}>
										Eliminar
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>No se encontraron productos.</p>
			)}
			{editingProductId && (
                <div className={styles.editUserForm}>
                    <div className={styles.editUserForm2}>
                        <h2 className={styles.nameEdit}>Editar Producto</h2>
                        <form className={styles.editForm}>
                            <div className={styles.Edit}>
                                <label 
                                className={styles.EditLabel} 
                                htmlFor='precio'>Precio:</label>
                                <input
                                    type='number'
                                    id='precio'
                                    name='precio'
                                    value={editedProduct?.precio ||  ''}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={styles.Edit}>
                                <label 
                                className={styles.EditLabel} 
                                htmlFor='stock'>Stock:</label>
                                <input
                                    type='number'
                                    id='stock'
                                    name='stock'
                                    value={editedProduct?.stock || ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <button className={styles.EditB}  onClick={saveChanges}>Guardar</button>
                                <button className={styles.EditB}  onClick={cancelEdit}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
			</div>
		</div>
	);
}

export default MisProductos;
