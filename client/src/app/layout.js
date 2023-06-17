'use client'

import { Providers } from '../redux/Providers/Providers';
import NavBar from '../components/NavBar/NavBar';
import { usePathname } from 'next/navigation';
import { Cairo } from 'next/font/google'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const cairo = Cairo({
  subsets: ['latin'],
});


export default function RootLayout({children}){
  const router = usePathname();
  console.log(router);
  return (
    <html lang="en">
      <head>
        {/* <link rel='stylesheet' href='https://bootswatch.com/5/vapor/bootstrap.min.css' /> */}
      </head>
        <body className={cairo.className}>
          <Providers>
           {(router !='/' && router!='/loging' && router!='/registrarse')? <NavBar />:''}
            <div className='container p-4'>
              {children}
            </div>
          </Providers>
        </body>
    </html>
  )}
