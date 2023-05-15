import React from "react";
import Product from "./Product";
import styles from "../styles/filtered.module.css";
export default function AllProductsInSameCategory({ prods }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filteredProducts}>
        <Product prods={prods} key={prods.itemId} />
      </div>
    </div>
  );
}
