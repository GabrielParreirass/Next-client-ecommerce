import React, { useEffect, useState } from "react";
import { useContext } from "react";
import FilterContext from "../../contexts/FilterContext";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Futebol.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("https://express-ecommerce-server.vercel.app/getAll");
  const data = await res.json();


  return {
    props: {
      data: data,
    },
  };
};

function Filter({ data }: any) {
  const dataContext = useContext(FilterContext);

  const dataFiltered = data.filter((i: any) =>
    i.team_name.includes(dataContext.state.data)
  );

  if (dataFiltered.length == 0) {
    return (
      <div>
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
    );
  }

  return (
    <div className={styles.containerProducts}>
      {dataFiltered.map(
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
      <div className={styles.dontFind}>
          <h2>Não encontrou o que precisava?😢</h2>
          <p>Nos mande sua duvida/sugestão pela DM do instagram, <Link href="https://www.instagram.com/diamond.storebh/" rel='next' target="_blank">clicando aqui!</Link></p>
        </div>
    </div>
  );
}

export default Filter;
