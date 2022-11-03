import React, {useEffect, useState} from 'react'
import { useCart } from "react-use-cart";
import styles from '../../styles/Success.module.css'


function SuccessPage() {
  const { emptyCart  } = useCart();
  const [cartProvisorio, setCartProvisorio] = useState({})
  

  useEffect(()=>{
      emptyCart()
  },[])


  return (
    <div className={styles.containerSuccess}>
      <h2>Seu pagamento foi concluido com sucesso!</h2>
      <br />
      <p>Caso precise de algum suporte ou atualização em relação seu pedido, chame a gente no direct do Instagram, <a href="https://www.instagram.com/diamond.storebh/" rel='next' target='_blank'>clicando aqui!</a></p>
      <p>O prazo de entrega é de até 25 dias.</p>
      </div>
  )
}

export default SuccessPage