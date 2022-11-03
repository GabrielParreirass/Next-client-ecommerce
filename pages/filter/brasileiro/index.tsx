import React from 'react'
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from 'next/link';
import styles from "../../../styles/Futebol.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
    const res = await fetch('http://localhost:3001/getBrasileiro')
    const data = await res.json()

    
    return{
        props: {
            data: data
        }
    }
};

function Brasileiro({data}:any) {
  return (
    <div className={styles.containerProducts}>
        {data.map(
          (i: {
            team_name: string;
            value: number;
            team_year: string;
            _id: string;
            sport: string;
          }) => (
            <Link href={`/${i.sport}/${i._id}`} key={i._id}>
              <div className={styles.product}>
                <Image
                  src={`/images/${i.team_name.split(" ").join("")}/${i.team_name
                    .split(" ")
                    .join("")}_det1.webp`}
                  height="300px"
                  width={"300px"}
                  style={{ borderRadius: "10px" }}
                ></Image>
                <div className={styles.wrapperInfosTeam}>
                  <h2 className={styles.TeamName}>
                    {i.team_name} | {i.team_year}
                  </h2>
                </div>
                <div className={styles.wrapperPrice}>
                  <div className={styles.discountPrice}>R$350,00</div>
                  <div className={styles.rightPrice}> R${i.value - 1},99</div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
  )
}

export default Brasileiro