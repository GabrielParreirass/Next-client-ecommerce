import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import SliderComponent from "../components/Slider";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import React, { Component } from "react";
import Slider from "react-slick";

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch("http://localhost:3001/getForHome");
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
    initialSlide: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };



  return (
    <div className={styles.container}>
      <SliderComponent />
      <Slider {...settings} className={styles.container}>
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
                  <div className={styles.discountPrice}>R$250,00</div>
                  <div className={styles.rightPrice}> R${i.value}</div>
                </div>
              </div>
            </Link>
          )
        )}
      </Slider>
    </div>
  );
};

export default Home;
