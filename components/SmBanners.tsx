import React from "react";
import Image from "next/image";
import styles from '../styles/Banners.module.css';
import Link from "next/link";

function SmBanners() {
  return (
    <div  className={styles.banners}>
      <div className={styles.banner}>
        <Link href={'/filter/infantil'}>
          <Image src={"/banners/BANNERS_05.jpg"} height="500px" width="400px" />
        </Link>
      </div>
      <div className={styles.banner}>
        <Link href={'/filter/feminino'}>
          <Image src={"/banners/BANNERS_03.png"} height="500px" width="400px" />
        </Link>
      </div>
      <div className={styles.banner}>
        <Link href={'/filter/retro'}>
          <Image src={"/banners/BANNERS_01.png"} height="500px" width="400px" />
        </Link>
      </div>
    </div>
  );
}

export default SmBanners;
