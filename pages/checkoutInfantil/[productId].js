import Image from "next/image";
import styles from '../../styles/ProductInfantil.module.css'
import React, { Component, useState } from "react";
import Slider from "react-slick";
import { CartProvider, useCart } from "react-use-cart";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




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
        inCart,
        getItem
    } = useCart();

    const settings = {
        customPaging: function (i) {
            return (
                <div className={styles.sliderOpt}>
                    <img src={`/images/${data.team_name.split(" ").join("")}/${data.team_name.split(" ").join("")}_det${i + 1}.webp`} className={styles.photos} />
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
    const [qtde, setQtde] = useState(1)

    function handleClickBtn(e) {
        setSize(e.target.value)
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

        setSize()

        event.preventDefault()



        if (size === null) {
            toast.warn('Escolha o tamanho da blusa!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else if (inCart(data._id + namePerso + number)) {
            let item = getItem(data._id + namePerso + number)
            let msg = 'ja possui no carrinho'
            if (namePerso != null) {
                if ((item.namePerso == null || item.namePerso != namePerso)) {
                    msg = 'Problema nome'

                }
            }
            else if (number != null) {
                if (number.length === 0) {
                    setNumber(null)
                }
                else if ((item.number === null || item.number != number)) {
                    msg = 'Problema no numero'

                }
            }

            if (msg == 'ja possui no carrinho') {
                toast.warn('Já possui um item idêntico no carrinho!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            } else if (window.confirm(msg)) {
                let persoPrice = 0

                if (namePerso != null) {
                    persoPrice += 10

                }

                if (number != null) {
                    persoPrice += 10
                }

                addItem({
                    id: data._id + namePerso + number,
                    size: size,
                    name: data.team_name,
                    year: data.team_year,
                    namePerso: namePerso,
                    number: number,
                    price: parseInt(data.value) + persoPrice
                },
                    qtde
                )
                setNumber(null)
                setNamePerso(null)
                toast.success('Item adicionado ao carrinho!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }





        } else {

            let persoPrice = 0

            if (namePerso != null) {
                persoPrice += 10

            }

            if (number != null) {
                persoPrice += 10
            }

            addItem({
                id: data._id + namePerso + number,
                size: size,
                name: data.team_name,
                year: data.team_year,
                namePerso: namePerso,
                number: number,
                price: parseInt(data.value) + persoPrice
            },
                qtde
            )
            toast.success('Item adicionado ao carrinho!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }



    }
    return (
        <div className={styles.container}>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

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
                <h2 className={styles.value}>R${(data.value - 0.1).toFixed(2).split(".").join(",")}</h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.size}>
                        <p>Tamanho selecionado: <span>{size}</span> </p>
                    </div>
                    <div className={styles.buttonsWrapper}>

                        <select className={styles.selectSize} onChange={(e) => handleClickBtn(e)}>
                            <option className={styles.buttons} value='2/3'>2/3 anos</option>
                            <option className={styles.buttons} value='3/4'>3/4 anos</option>
                            <option className={styles.buttons} value='4/5'>4/5 anos</option>
                            <option className={styles.buttons} value='5/6'>5/6 anos</option>
                            <option className={styles.buttons} value='6/7'>6/7 anos</option>
                            <option className={styles.buttons} value='7/8'>7/8 anos</option>
                            <option className={styles.buttons} value='8/9'>8/9 anos</option>
                            <option className={styles.buttons} value='9/10'>9/10 anos</option>
                            <option className={styles.buttons} value='10/11'>10/11 anos</option>
                            <option className={styles.buttons} value='11/12'>12/13 anos</option>
                        </select>


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
