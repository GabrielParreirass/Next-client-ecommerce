import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SliderComponent from "../components/Slider";
import { GetStaticProps } from "next";
import Link from 'next/link'
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";

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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };



  return (
    <div className={styles.container}>
      <SliderComponent />
      <Slider {...settings} className={styles.container}>
      {data.map((i: {
          team_name: string; value: number; team_year: string; _id: string; sport: string;})=>(
          <div  className={styles.product}>
            <h2>{i.team_name}</h2>
            <h2>{i.team_year}</h2>
            <Image src={`/images/${i.team_name.split(" ").join("")}/${i.team_name.split(" ").join("")}_det1.webp`} height='300px' width={'300px'} style={{borderRadius: '10px'}}></Image>
            <p>R${i.value - 1},99</p>
            <Link href={`/${i.sport}/${i._id}`}><a className={styles.linkDetails}>Ver Detalhes</a></Link>
          </div>
        ))}    
      </Slider> 
    </div>
  );
};

export default Home;
