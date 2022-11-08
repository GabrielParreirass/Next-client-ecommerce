import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import Router from "next/router";
import { useContext } from "react";
import FilterContext from "../contexts/FilterContext";

function Header() {
  const data = useContext(FilterContext);
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    totalItems,
  } = useCart();

  const handleSeacrh = () => {
    

    data.setProductsData(
      searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1)
    );

    Router.push(`/filter`);
  };

  const [productsQtde, setProductsQtde] = React.useState(0);
  const [empty, setEmpty] = React.useState(Object);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    setProductsQtde(totalUniqueItems);
    setEmpty(isEmpty);
  }, [totalUniqueItems]);

  React.useEffect(() => {
    let menu: any = document.getElementById("side-menu");
    menu.style.display = "none";
  }, []);

  const handleClickMenu = () => {
    let menu: any = document.getElementById("side-menu");
    if (menu.style.display == "none") {
      menu.style.display = "flex";
    } else {
      menu.style.display = "none";
    }
  };

  const handleClickLink = () => {
    let menu: any = document.getElementById("side-menu");
    menu.style.display = "none";
  };

  return (
    <div>
      <div className={styles.containerPc}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>
              <Link href={"/"}><Image src={"/logos/LogoHeader.png"} height="100" width="100" className={styles.logo}></Image></Link>
            </h2>
          </div>
          <div className={styles.filter}>
            <input
              type="text"
              placeholder="Buscar times"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />

            <button onClick={() => handleSeacrh()} id="filterInp">
              <Image src={"/search.svg"} width="20px" height="20px"></Image>
            </button>
          </div>
          <div className={styles.cart}>
            <Link href={"/cart"}>
              <Image src={"/images/cart.svg"} height="40px" width="40px" />
            </Link>
            <span> {productsQtde}</span>
          </div>
        </div>
        <div className={styles.subContainer}>
          <ul>
            <Link href={"/"}>
              <li>Início</li>
            </Link>
            <Link href={"/filter/selecoes"}>
              <li>Seleções</li>
            </Link>
            <Link href={"/filter/brasileiro"}>
              <li>Brasileiro</li>
            </Link>
            <Link href={"/filter/internacional"}>
              <li>Internacional</li>
            </Link>
            <Link href={"/futebol"}>
              <li>Feminino</li>
            </Link>
            <Link href={"/futebol"}>
              <li>Infantil</li>
            </Link>
            <Link href={"/futebol"}>
              <li>Retrô</li>
            </Link>
          </ul>
        </div>
      </div>

      <div className={styles.containerMobile}>
        <div className={styles.headerMobile}>
          <div className={styles.titleMobile}>
            <h2>
              <Link href={"/"}>
                <Image src={"/logos/LogoHeader.png"} height="300" width="300"></Image>
              </Link>
            </h2>
          </div>
          <div className={styles.wrapperIconsHeaderMobile}>
            <div
              className={styles.btnMenuMobile}
              onClick={() => handleClickMenu()}
            >
              <Image src={"/menuBtn.svg"} height="40px" width="40px" />
            </div>
            <div className={styles.cartIconMobile}>
              <Link href={"/cart"}>
                <Image src={"/images/cart.svg"} height="40px" width="40px" />
              </Link>
              <span> {productsQtde}</span>
            </div>
          </div>
        </div>
        <div className={styles.subHeaderMobile}>
          <div className={styles.filter}>
            <input
              type="text"
              placeholder="Buscar times"
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />

            <button onClick={() => handleSeacrh()} id="filterInp">
              <Image src={"/search.svg"} width="20px" height="20px"></Image>
            </button>
          </div>
        </div>

        <div className={styles.sideMenu} id="side-menu">
          <ul>
            <Link href={"/"}>
              <li onClick={() => handleClickLink()}>Início</li>
            </Link>
            <Link href={"/futebol"}>
              <li onClick={() => handleClickLink()}>Seleções</li>
            </Link>
            <Link href={"/filter/brasileiro"}>
              <li onClick={() => handleClickLink()}>Brasileiro</li>
            </Link>
            <Link href={"/filter/internacional"}>
              <li onClick={() => handleClickLink()}>Internacional</li>
            </Link>
            <Link href={"/futebol"}>
              <li onClick={() => handleClickLink()}>Feminino</li>
            </Link>
            <Link href={"/futebol"}>
              <li onClick={() => handleClickLink()}>Infantil</li>
            </Link>
            <Link href={"/futebol"}>
              <li onClick={() => handleClickLink()}>Retrô</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
