import React from 'react'
import Link from 'next/link';

import styles from './failure.module.css'

function failure() {
  return (
    <div className={styles.container}>
        <div className={styles.containerX}>
          <Link className={styles.x} href={"/home"}>
            X
          </Link>
        </div>
        <div className={styles.container2}>

            <p className={styles.rechazo}>
                Error 404 pago no realizado 
            </p>

            <div>
                <Link href={'/home'}>
                Volver a intentar 
                </Link>
            </div>
        </div>
        
    </div>
  )
}

export default failure;