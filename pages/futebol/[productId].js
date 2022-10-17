import Image from "next/image";
import styles from '../../styles/Product.module.css'
import React, { Component, useState } from "react";
import Slider from "react-slick";
import { CartProvider, useCart } from "react-use-cart";



export const getStaticProps = async (context) => {
  const { params } = context;

  const res = await fetch(`http://localhost:3001/products/${params.productId}`);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:3001/getAll");

  const data = await response.json();

  const paths = data.map((todo) => {
    return {
      params: {
        productId: `${todo._id}`,
      },
    };
  });

  return { paths, fallback: false };
};

function Product({ data }) {

  const { addItem } = useCart();
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    inCart
  } = useCart();

  const settings = {
    customPaging: function (i) {
      return (
        <div className={styles.sliderOpt}>
          <img src={`/images/${data.team_name.split(" ").join("")}/${data.team_name.split(" ").join("")}_det${i + 1}.webp`} style={{ width: '150px', objectFit: 'cover', borderRadius: '10px', padding: '0px' }} />
        </div>
      );
    },
    dots: true,
    infinite: true,
    dotsClass: 'slick-dots custom-inidcator',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };


  const [size, setSize] = useState(null)
  const [number, setNumber] = useState(null)
  const [namePerso, setNamePerso] = useState(null)
  const [qtde, setQtde] = useState('1')

  function handleClickBtn(e) {
    setSize(e.target.innerHTML)
  }

  function handleChangeNumber(e) {
    setNumber(e.target.value)
  }

  function handleChangeName(e) {
    setNamePerso(e.target.value)
  }
  function handleChangeQtde(e) {
    setQtde(e.target.value)
  }

  function handleSubmit(event) {

    event.preventDefault()

    if (size === null) {
      window.alert('Escolha um tamanho de blusa!')
    } else if(inCart(data._id)){
      window.alert('Você já possui esse item no carrinho!')
    }else{
      addItem({
        id: data._id,
        size: size,
        name: data.team_name,
        year: data.team_year,
        namePerso: namePerso,
        number: number,
        price: data.value
      },
        qtde
      )
    }



  }
  return (
    <div className={styles.container}>

      <Slider {...settings} className={styles.slider}>
        <div>
          <Image src={`/images/${data.team_name.split(" ").join("")}/${data.team_name.split(" ").join("")}_det1.webp`} height='500px' width={'500px'} />
        </div>
        <div>
          <Image src={`/images/${data.team_name.split(" ").join("")}/${data.team_name.split(" ").join("")}_det2.webp`} height='500px' width={'500px'} />
        </div>
        <div>
          <Image src={`/images/${data.team_name.split(" ").join("")}/${data.team_name.split(" ").join("")}_det3.webp`} height='500px' width={'500px'} />
        </div>
      </Slider>

      <div className={styles.Infos}>
        <h2>Camisa {data.team_name} {data.team_year}</h2>
        <h2>R${data.value - 1}</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.size}>
            <p>Tamanho slecionado: <span>{size}</span> </p>
          </div>
          <div className={styles.buttonsWrapper}>
            <div className={styles.buttons} value='P' onClick={(e) => handleClickBtn(e)}>P</div>
            <div className={styles.buttons} onClick={(e) => handleClickBtn(e)}>M</div>
            <div className={styles.buttons} onClick={(e) => handleClickBtn(e)}>G</div>
            <div className={styles.buttons} onClick={(e) => handleClickBtn(e)}>GG</div>
          </div>

          <div className={styles.wrapperInps}>
            <label className={styles.label}>Nome <span>+R$10,00</span></label>
            <input type="text" className={styles.inpPersonali} placeholder='Nome' maxLength='14' onChange={(e) => handleChangeName(e)}></input>

            <label className={styles.label}>Numero <span>+R$10,00</span></label>
            <input
              type="number" className={styles.inpPersonali} placeholder='Numero' min="1" max="999"
              onChange={(e) => handleChangeNumber(e)}
            ></input>

            <select className={styles.select} onChange={(e) => handleChangeQtde(e)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

          </div>

          <button type='submit' name='Comprar' className={styles.comprar}>Comprar</button>
        </form>
      </div>
    </div>
  );
}

export default Product;
