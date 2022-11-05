import React from 'react'
import styles from '../styles/Footer.module.css'
import { GrInstagram } from 'react-icons/gr';
import Link from 'next/link';


function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footerItem}>Copyright © 2022 Diamond Store - Todos os direitos reservados</div>
      <div className={styles.wrapperFooter}>
        <ul>
          <li>Politica de Privacidade</li>
          <li>Envio e Entrega</li>
        </ul>
        <div className={styles.insta}>
          <Link href="https://www.instagram.com/diamond.storebh/" rel='next' target="_blank"><GrInstagram/></Link>
        </div>
      </div>
    </div>
  )
}

export default Footer