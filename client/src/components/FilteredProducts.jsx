import React, { useEffect, useState } from "react";
import { MainURL } from "../url";
import { useParams } from "react-router-dom";
import Product from "./Product";
import ProductNav from "./ProductNav";
import styles from "../styles/filtered.module.css";
export default function FilteredProducts() {
  const { subcategory } = useParams();

  const [productList, setProductList] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    try {
      fetch(`/products/subcategory?subCategory=${subcategory}`)
        .then((resp) => resp.json())
        .then((data) => setProductList(data))
        .catch((err) => setErr(err.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [subcategory]);
  return (
    <>
      <ProductNav />
      <main className={styles.wrapper}>
        <div>
          <h2>{subcategory}</h2>
          <div className={styles.filteredProducts}>
            {productList.length ? (
              productList.map((elem) => (
                <Product prods={elem} key={elem.itemId} />
              ))
            ) : (
              <h2>Loading...</h2>
            )}
          </div>
          {err && <h2 style={{ color: "red" }}>{err}</h2>}
        </div>
      </main>
    </>
  );
}
