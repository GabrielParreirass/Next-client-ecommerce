import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { CartProvider, useCart } from "react-use-cart";

function Header() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    totalItems,
  } = useCart();

  const handleClickCart = () => {
    let e: any = document.getElementById("cart-list");

    if (e.style.display == "none") {
      e.style.display = "flex";
    } else {
      e.style.display = "none";
    }
  };

  const [productsQtde, setProductsQtde] = React.useState(0);
  const [empty, setEmpty] = React.useState(Object);

  React.useEffect(() => {
    let e: any = document.getElementById("cart-list");
    e.style.display = "none";
  }, []);

  React.useEffect(() => {
    setProductsQtde(totalUniqueItems);
    setEmpty(isEmpty);
  }, [totalUniqueItems]);

  return (
    <>
      <div className={styles.container}>
        <h2>GepaStore</h2>
        <ul>
          <li>
            <Link href={"/futebol"}>
              <a>Futebol</a>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href={"/basquete"}>
              <a>Basquete</a>
            </Link>
          </li>
        </ul>

        <div className={styles.cart}>
          <Image
            src={"/images/cart.svg"}
            height={50}
            width={50}
            onClick={() => handleClickCart()}
          />
          <span> {productsQtde}</span>
          <div className={styles.cartList} id="cart-list">
            <ul>
              {empty ? (
                <p style={{ color: "black" }}>Carrinho vazio!</p>
              ) : (<>
                {items.map((item: any) => (
                  <li key={item.id}>
                    <Image
                      src={`/images/${item.name.split(" ").join("")}/${item.name
                        .split(" ")
                        .join("")}_det1.webp`}
                      height="50px"
                      width="50px"
                    ></Image>
                    <h3>
                      {item.name} (x{item.quantity})
                    </h3>

                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, parseInt(item.quantity) - 1)
                      }
                    >
                      -
                    </button>

                    <button
                      onClick={() =>
                        updateItemQuantity(item.id, parseInt(item.quantity) + 1)
                      }
                    >
                      +
                    </button>

                    <button onClick={() => removeItem(item.id)}>&times;</button>
                  </li>
                ))}<div className={styles.finalizar} onClick={()=>{console.log('clicou')}}>Finalizar compras!</div></> 
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
