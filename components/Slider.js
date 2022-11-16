import React from "react";
import Slider from "react-slick";
import styles from '../styles/Slider.module.css';
import Image from 'next/image'

function SliderComponent() {

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        <div className={styles.sliderItem}>
          <Image
            className={styles.img}
            src={'/banners/BANNER-1.png'}
            height='450px'
            width='1580px'
          />
        </div>
        <div className={styles.sliderItem}>
          <Image
            className={styles.img}
            src={'/banners/2-BANNER.png'}
            height='450px'
            width='1580px'
          />
        </div>
      </Slider>
    </div>
  );
}


export default SliderComponent;
