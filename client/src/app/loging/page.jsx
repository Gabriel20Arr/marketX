'use client';

import { useEffect, useState, useContext } from 'react';
import Style from './Loging.module.css';
import logo from '../../images/MarketX-newlogo.png';
import Image from 'next/image';
import { useGetUsersQuery } from '@/src/redux/services/userApi';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Store } from '@/src/utils/Store';

export default function Registrarse() {
	const [showPass, setShowPass] = useState(false);

	const [usuario, setUsuario] = useState({
		correo: '',
		contraseña: '',
	});

	const blockedUsers = useSelector((state) => state.blockedUsers);

	const [error, setError] = useState({
		correo: '',
		contraseña: '',
		blocked: '',
	});

	const { data, refetch } = useGetUsersQuery(null);
	useEffect(() => {
		refetch();
	}, []);

	const router = useRouter();
	const { dispatch } = useContext(Store);

	const handlerUsuario = (e) => {
		const { value, name } = e.target;
		setUsuario({ ...usuario, [name]: value });
	};

	const handlerSubmit = (e) => {
		e.preventDefault();
		const correos =
			data && data.map((user) => user.correo).includes(usuario.correo);
		const contraseñas =
			data && data.map((user) => user.contraseña).includes(usuario.contraseña);

		if (correos && contraseñas) {
			const guardado = data.find((user) => user.correo === usuario.correo);

			if (blockedUsers.includes(usuario.correo)) {
				setError({
					correo:
						'Error: no puedes acceder con un correo electrónico bloqueado',
					contraseña: '',
					blocked: '',
				});
				return;
			}

			const guardadoString = JSON.stringify(guardado);
			localStorage.setItem('usuario', guardadoString);
			dispatch({ type: 'INICIAL', payload: guardado.carrito });
			setUsuario({
				correo: '',
				contraseña: '',
			});

			setError({
				correo: '',
				contraseña: '',
				blocked: '',
			});

			alert('Se inició sesión correctamente');
			router.replace('/home');
		} else {
			setError((prevError) => ({
				...prevError,
				correo: correos ? '' : 'Correo no registrado',
				contraseña: correos ? (contraseñas ? '' : 'Contraseña incorrecta') : '',
			}));
		}
	};

	const habilitarBoton = () => {
		return usuario.contraseña === '' || usuario.correo === '';
	};

	return (
		<div className={Style.container}>
			<div className={Style.image}></div>
			<div>
				<div className={Style.containerLogo}>
					<Image className={Style.Logo} src={logo} alt='logo' />
					<h2>MARKET X</h2>
				</div>
				<div className='d-flex align-items-center justify-content-center w-100  pb-5 mb-130 pr-145'>
					<form className={Style.form} onSubmit={handlerSubmit}>
						<h1 className='mb-3 text-center'>Iniciar Sesión</h1>
						<div className='mb-2'>
							<label htmlFor='correo' className='form-label'>
								Correo:
							</label>
							<div>
								<input
									className={Style.formInput}
									type='text'
									name='correo'
									onChange={handlerUsuario}
									value={usuario.correo}
								/>
							</div>
							<p className='form-text text-danger'>
								{error.correo}
								{error.blocked}
							</p>
						</div>
						<div className='mb-3'>
							<label htmlFor='contraseña' className='form-label'>
								Contraseña:
							</label>
							<div className={Style.formPassword}>
								<input
									className={Style.formInput}
									type={showPass ? 'text' : 'password'}
									name='contraseña'
									onChange={handlerUsuario}
									value={usuario.contraseña}
								/>
								<div
									className={Style.showPassword}
									onClick={() => setShowPass(!showPass)}
								>
									{showPass ? 'Ocultar' : 'Mostrar'}
								</div>
							</div>
							<p className='form-text text-danger'>
								{error.contraseña}
								{error.blocked}
							</p>
						</div>
						<button
							type='submit'
							className='btn btn-primary btn-lg w-100'
							disabled={habilitarBoton()}
						>
							Iniciar Sesión
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
