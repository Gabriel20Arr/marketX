'use client'
import React from 'react';
import Link from 'next/link';
import {  RxDashboard, RxPerson } from 'react-icons/rx';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { FiSettings } from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa';

import styles from './SideBar.module.css';

const Sidebar = ({ children }) => {
	return (
		<div className={styles.container}>
			<div className={styles.sidebar}>
				<Link href='/home'>
					<div className={`${styles.navItem} ${styles.inlineBlock}`}>
						<RxDashboard size={20} />
					</div>
				</Link>
				<Link href='/admin/users'>
					<div className={`${styles.navItem} ${styles.inlineBlock}`}>
						<RxPerson size={20} />
					</div>
				</Link>
				<Link href='/admin/orders'>
					<div className={`${styles.navItem} ${styles.inlineBlock}`}>
						<HiOutlineShoppingBag size={20} />
					</div>
				</Link>
				<Link href='/admin/products'>
					<div className={`${styles.navItem} ${styles.inlineBlock}`}>
						<FaBoxOpen size={20} />
					</div>
				</Link>
				<Link href='/'>
					<div className={`${styles.navItem} ${styles.inlineBlock}`}>
						<FiSettings size={20} />
					</div>
				</Link>
			</div>
			<main className={styles.content}>{children}</main>
		</div>
	);
};

export default Sidebar;
