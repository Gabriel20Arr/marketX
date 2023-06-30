'use client';

import { StoreProvider } from '../utils/Store';
import { Providers } from '../redux/Providers/Providers';
import NavBar from '../components/NavBar/NavBar';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Share_Tech } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Script from 'next/script';
import axios from 'axios';

//axios.defaults.baseURL = 'http://localhost:3001'
//axios.defaults.baseURL = 'https://marketx-production.up.railway.app'

const inter = Share_Tech({
	weight: ['400'],
	size: 'xx-Larger',
	style: [],
	subsets: ['latin'],
	display: 'swap',
});

const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

const cairo = Cairo({
	subsets: ['latin'],
});

export default function RootLayout({ children }) {
	const router = usePathname();
	// console.log(router);

	const isAdminRoute = router === '/admin';

	return (
		<html lang='en' className={inter.className}>
			<head>
				{/* <link rel='stylesheet' href='https://bootswatch.com/5/vapor/bootstrap.min.css' /> */}
				{/* <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript">  
				</Script> */}
				<link rel="stylesheet" type="text/css" charset="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" /> 
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
			</head>

			<body className={cairo.className}>
				<StoreProvider>
					<Providers>
						<SessionProvider>
							{(!isAdminRoute && router !='/' && router!='/login' && router!='/registrarse')? <NavBar className={inter.className}/>:''}
							<div>
								{children}
							</div>
						</SessionProvider>
					</Providers>
				</StoreProvider>
			</body>
		</html>
	);
}
