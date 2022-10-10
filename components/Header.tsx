import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { motion } from "framer-motion";

function Header() {
  return (
    <>
      <div className={styles.container}>
        <h2>GepaStore</h2>
        <ul>
          <li>
            <Link href={"/futebol"}>
              <a>Futebol</a>
            </Link>
          </li>
          <li>
            <Link href={"/basquete"}>
              <a>Basquete</a>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
        </ul>

        <div className={styles.container_mobile}>
        </div>
      </div>
    </>
  );
}

export default Header;