import React, { useEffect, useState } from "react";
import Product from "./Product";
import styles from "../styles/home.module.css";
import HomeSlider from "./HomeSlider";
export default function HomeInfo() {
  const [prods, setprods] = useState({});
  useEffect(() => {
    try {
      fetch(`/slider`)
        .then((resp) => resp.json())
        .then((data) => setprods(data));
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return (
    <>
      {Object.keys(prods).length > 0 ? (
        <div className={styles.homeInfo_wrapper}>
          <HomeSlider images={prods.imageUrl} />
          {prods.offers.map((elem) => (
            <Product prods={elem} key={elem.itemId} />
          ))}
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}
