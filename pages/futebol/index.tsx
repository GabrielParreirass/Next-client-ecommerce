import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "../../styles/Futebol.module.css";
import Image from 'next/image'

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://localhost:3001/getFutebol");
  const data = await res.json();


  return {
    props: {
      data: data,
    },
  };
};

function Futebol({ data }: any) {
  return (
    <div className={styles.containerProducts}>
      {data.map(
        (i: {
          team_name: string;
          value: number;
          team_year: string;
          _id: string;
        }) => (
          <div className={styles.product}>
            <h2>
              {i.team_name}
            </h2>
            <h2>
              {i.team_year}
            </h2>
            <Image src={`/images/${i.team_name.split(" ").join("")}/${i.team_name.split(" ").join("")}_det1.webp`} height='300px' width={'300px'} style={{borderRadius: '10px'}}></Image>
            <p>R${i.value - 1},99</p>
            <Link href={`/futebol/${i._id}`}>
              <a className={styles.linkDetails}>Ver Detalhes</a>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default Futebol;
