import React from 'react';
import styles from './Header.module.css';

function Header() {
	return (
		<div className={styles.headerContainer}>
			<h2 className={styles.title}>Dashboard</h2>
			<h2 className={styles.subtitle}>Bienvenido, Admin</h2>
		</div>
	);
}

export default Header;
