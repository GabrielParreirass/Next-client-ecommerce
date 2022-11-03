import React from "react";
import { CartProvider, useCart } from "react-use-cart";
import styles from "../../styles/Cart.module.css";
import Image from "next/image";
import Axios from "axios";
import Router from "next/router";

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
  } = useCart();

  const handleCheckout = () => {
    Axios.post("http://localhost:3001/checkout", {
      items: items,
    })
      .then((res) => {
  
        Router.push(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const [empty, setEmpty] = React.useState(true);

  React.useEffect(() => {
    setEmpty(isEmpty);
  }, [totalUniqueItems]);

  if (empty === true) {
    return <div className={styles.empty}>Carrinho vazio!</div>;
  } else {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <table className={styles.table}>
              <tr className={styles.tr}>
                <th className={styles.th}>Produto</th>
                <th className={styles.th}>Personalização</th>
                <th className={styles.th}>Preço</th>
                <th className={styles.th}>Quantidade</th>
                <th className={styles.th}>Total</th>
              </tr>
              {items.map((item: any) => (
                <tr key={item.id}>
                  <td className={styles.td}>
                    <Image
                      width={100}
                      height={100}
                      src={`/images/${item.name.split(" ").join("")}/${item.name
                        .split(" ")
                        .join("")}_det1.webp`}
                    ></Image>
                    <div className={styles.itemName}>
                      <div className={styles.name}>{item.name}</div>{" "}
                      <div className={styles.size}>Tamanho: {item.size}</div>
                    </div>
                  </td>

                  <td className={styles.td}>
                    {item.namePerso ? (
                      <div className={styles.namePerso}>
                        <div>Nome:</div>{" "}
                        <div className={styles.result}>{item.namePerso}</div>
                      </div>
                    ) : (
                      <div className={styles.namePerso}>Não escolheu nome</div>
                    )}
                    {item.number ? (
                      <div className={styles.numberPerso}>
                        <div>Número: </div>
                        <div className={styles.result}>{item.number}</div>
                      </div>
                    ) : (
                      <div className={styles.numberPerso}>
                        Não escolheu numero
                      </div>
                    )}
                  </td>

                  <td className={styles.td}>R${parseInt(item.price)},00</td>
                  <td className={styles.td}>
                    <div className={styles.qtdWrapper}>
                      <button
                        onClick={() =>
                          updateItemQuantity(
                            item.id,
                            parseInt(item.quantity) - 1
                          )
                        }
                        className={styles.button1}
                      >
                        -
                      </button>
                      <div className={styles.qtd}>{item.quantity}</div>
                      <button
                        onClick={() =>
                          updateItemQuantity(
                            item.id,
                            parseInt(item.quantity) + 1
                          )
                        }
                        className={styles.button2}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className={styles.td}>
                    R$
                    {(parseInt(item.price) * parseInt(item.quantity))
                      .toFixed(2)
                      .split(".")
                      .join(",")}
                  </td>
                </tr>
              ))}
            </table>
            <div className={styles.wrapperCupom}>
              <button className={styles.btnCupom}>Aplicar Cupom</button>
              <input
                type="text"
                placeholder="Codigo do cupom"
                className={styles.inpCupom}
              />
            </div>
          </div>
          <div className={styles.checkoutBox}>
            <div>
              <h3>Items no carrinho: {totalUniqueItems}</h3>
            </div>
            <div className={styles.subtotal}>
              Subtotal: <div>R${cartTotal},00</div>
            </div>
            <hr />
            <div className={styles.total}>
              Total: <h3>R${cartTotal},00</h3>
            </div>
            <button
              className={styles.btnFinalizar}
              onClick={() => handleCheckout()}
            >
              Finalizar compra
            </button>
          </div>
        </div>

        <div className={styles.wrapperMobile}>
          <div className={styles.myCart}>Seu Carrinho</div>
          {items.map((item: any) => (
            <div className={styles.containerProductsMobile}>
              <>
                <div className={styles.imageMobile}>
                  <Image
                    width={150}
                    height={150}
                    src={`/images/${item.name.split(" ").join("")}/${item.name
                      .split(" ")
                      .join("")}_det1.webp`}
                  ></Image>
                </div>
                <div className={styles.infosMobile}>
                  <div className={styles.persoMobile}>
                    <ul>
                      <li>Nome: {item.namePerso} </li>
                      <li>Numero: {item.number}</li>
                      <li>Tamanho: {item.size}</li>
                      <li>
                        Preço: {item.price.toFixed(2).split(".").join(",")}
                      </li>
                      <li>
                        Quantidade:
                        <div className={styles.qtdWrapper}>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                parseInt(item.quantity) - 1
                              )
                            }
                            className={styles.button1}
                          >
                            -
                          </button>
                          <div className={styles.qtd}>{item.quantity}</div>
                          <button
                            onClick={() =>
                              updateItemQuantity(
                                item.id,
                                parseInt(item.quantity) + 1
                              )
                            }
                            className={styles.button2}
                          >
                            +
                          </button>
                        </div>
                      </li>
                      <li>
                        <div className={styles.subTotal}>
                          Subtotal:<span>
                              { (parseInt(item.price) * parseInt(item.quantity))
                                                  .toFixed(2)
                                                  .split(".")
                                                  .join(",")}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            </div>
          ))}
          <div className={styles.checkoutBox}>
            <div>
              <h3>Items no carrinho: {totalUniqueItems}</h3>
            </div>
            <div className={styles.subtotal}>
              Subtotal: <div>R${cartTotal},00</div>
            </div>
            <hr />
            <div className={styles.total}>
              Total: <h3>R${cartTotal},00</h3>
            </div>
            <button
              className={styles.btnFinalizar}
              onClick={() => handleCheckout()}
            >
              Finalizar compra
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default Cart;
