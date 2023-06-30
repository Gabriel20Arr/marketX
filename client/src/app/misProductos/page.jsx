'use client';

import { useEffect, useState } from 'react';
import { useGetProductsUsersQuery } from '@/src/redux/services/productApi';
import styles from './misProductos.module.css';
import Link from 'next/link';
import axios from 'axios';

<<<<<<< HEAD
export default function MisProductos() {
  const { data, refetch } = useGetProductsUsersQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);
  
  var usuario = {};
  
  if (typeof window !== 'undefined') {
    // Código que accede a localStorage aquí
    const usuarioJSON = localStorage.getItem("usuario");
    usuario = JSON.parse(usuarioJSON);
  }
  
  const productos = data && data.find((use) => use.nombre === usuario?.correo);
  const apiProductos = productos ? productos.productos : [];

  return (
    <div>
      <Cards currentItems={apiProductos} />
    </div>
  );
=======
function MisProductos() {
	const { data, refetch } = useGetProductsUsersQuery();
	const [isLoading, setIsLoading] = useState(true);
	const [editingProductId, setEditingProductId] = useState(null);
	const [editedProduct, setEditedProduct] = useState({
		precio: '',
		stock: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await refetch();
			setIsLoading(false);
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
				`https://marketx-production.up.railway.app/producto/actualizar`,
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

	return (
		<div>
			<Link href='/admin' className={styles.link}>
				Volver
			</Link>

			<h1>Mis Productos</h1>
			{isLoading ? (
				<p>Cargando productos...</p>
			) : productos &&
			  Array.isArray(productos.productos) &&
			  productos.productos.length > 0 ? (
				<table className={styles.userTable}>
					<thead>
						<tr>
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
								<td>{producto.titulo}</td>
								<td>{producto.categoria}</td>
								<td>{producto.precio}</td>
								<td>{producto.stock}</td>
								<td>
									<button onClick={() => editProduct(producto._id)}>
										Editar
									</button>
									<button onClick={() => deleteProduct(producto._id)}>
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
					<h2>Editar Producto</h2>
					<form>
						<div>
							<label htmlFor='precio'>Precio:</label>
							<input
								type='number'
								id='precio'
								name='precio'
								value={editedProduct?.precio || ''}
								onChange={handleInputChange}
							/>
						</div>
						<div>
							<label htmlFor='stock'>Stock:</label>
							<input
								type='number'
								id='stock'
								name='stock'
								value={editedProduct?.stock || ''}
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
		</div>
	);
>>>>>>> 5edfdfcb81089019f17d718f478346bc1865e23f
}

export default MisProductos;
