import React from "react";
import { GetStaticProps } from "next";
import Link from "next/link";
import styles from "../../styles/Futebol.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://localhost:3001/getFutebol");
  const data = await res.json();

  console.log(data);

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
            <p>R${i.value - 1},99</p>
            <Link href={`/basquete/${i._id}`}>
              <a className={styles.linkDetails}>Ver Detalhes</a>
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default Futebol;
