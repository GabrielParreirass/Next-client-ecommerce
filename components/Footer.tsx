import React from 'react'
import styles from '../styles/Footer.module.css'

function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerItem}>Copyright © 2022 GepaStore - Todos direitos reservados</div>
      <div className={styles.footerItem}>Desenvolvido por <a href="https://github.com/GabrielParreirass">Gabriel Parreiras</a></div>
    </div>
  )
}

export default Footer