import React, { useState } from "react";
import styles from "../styles/home.module.css";
import ProductModal from "./ProductModal";


export default function Product({ prods }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [elem, setelem] = useState();
 

  return (
    <>
      <div
        className={styles.product}
        key={prods.itemId}
        onClick={() => {
          setModalOpen(true);
          setelem(prods);
        }}
      >
        <img src={require(`../assets/images/${prods.url}`)} alt={prods.name} />
        <h2>{prods.name}</h2>
        <p>{prods.desc}</p>
        <div className={styles.offer}>
          <span>{prods.price} Դ</span>
          {/* <button>ՈՒԶՈՒՄ ԵՄ</button> */}
        </div>
      </div>

      {modalOpen && (
        <ProductModal
          isActive={modalOpen}
          setIsActive={setModalOpen}
          elem={elem}
        />
      )}
    </>
  );
}
