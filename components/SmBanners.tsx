import React from "react";
import Image from "next/image";
import styles from '../styles/Banners.module.css';

function SmBanners() {
  return (
    <div  className={styles.banners}>
      <Image src={"/banners/BANNERS_05.jpg"} height="500px" width="400px" />
      <Image src={"/banners/BANNERS_03.png"} height="500px" width="400px" />
      <Image src={"/banners/BANNERS_01.png"} height="500px" width="400px" />
    </div>
  );
}

export default SmBanners;
