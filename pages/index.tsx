import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SliderComponent from "../components/Slider";
import { GetStaticProps } from "next";
import Link from 'next/link'

export const getStaticProps: GetStaticProps = async (context) => {

  const res = await fetch("http://localhost:3001/getAll");
  const data = await res.json();


  return {
    props: {
      data: data,
    },
  };
};

const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <SliderComponent />
      <div className={styles.containerProducts}>
        {data.map((i: {
          team_name: string; value: number; team_year: string; _id: string; sport: string;})=>(
          <div  className={styles.product}>
            <h2>{i.team_name}</h2>
            <h2>{i.team_year}</h2>
            <p>R${i.value - 1},99</p>
            <Link href={`/${i.sport}/${i._id}`}><a className={styles.linkDetails}>Ver Detalhes</a></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
