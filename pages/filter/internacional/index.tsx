import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/Futebol.module.css";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://localhost:3001/getInternacional");
  const data = await res.json();



  return {
    props: {
      data: data,
    },
  };
};

function Brasileiro({ data }: any) {

  const[dataShow, setDataShow] = React.useState([])
  
  React.useEffect(()=>{
    setDataShow(data)
  },[])

  const handleSetFilter = (e:any) => {
    const dataFiltered = data.filter((i: any) => i.league.includes(e.target.innerHTML));

    setDataShow(dataFiltered)

   
  };

  const handleClearFilter = () => {
    setDataShow(data)
  }

  return (
    <div className={styles.wrapperContainerProducts}>
      <div className={styles.filters}>
        <h2>CATEGORIAS</h2>
        <ul>
          <li onClick={(e) => handleSetFilter(e)}>Premier League</li>
          <li onClick={(e) => handleSetFilter(e)}>Bundesliga</li>
          <li onClick={(e) => handleSetFilter(e)}>Serie A</li>
          <li onClick={(e) => handleSetFilter(e)}>Ligue 1</li>
          <li onClick={(e) => handleSetFilter(e)}>La Liga</li>
          <li onClick={(e) => handleSetFilter(e)}>Outras Ligas</li>
        </ul>

        <button className={styles.clearFilter} onClick={() => handleClearFilter()}>Limpar Filtros</button>

      </div>
      <div className={styles.containerProducts}>
        {dataShow.map(
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
                  <div className={styles.rightPrice}> R${i.value}</div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
}

export default Brasileiro;
