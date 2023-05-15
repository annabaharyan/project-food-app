import React, { useEffect, useState } from "react";
import { MainURL } from "../url";
import styles from "../styles/productNav.module.css";
import { Link } from "react-router-dom";
export default function ProductList({ id, setId, group }) {
  const [prodList, setProdList] = useState();
  const [err, setErr] = useState();
  const japan = [styles.categories, styles.japan].join(" ");
  const china = [styles.categories, styles.china].join(" ");
  const bar = [styles.categories, styles.bar].join(" ");
  useEffect(() => {
    try {
      fetch(`${MainURL}/categories/${id}`)
        .then((resp) => resp.json())
        .then((data) => setProdList(data.subCategory))
        .catch((err) => setErr(err.message));
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
    <div
      className={id === 2 ? china : id === 3 ? bar : japan}
      onMouseMove={() => setId(id)}
      onMouseLeave={() => setId()}
    >
      {prodList &&
        prodList.map((elem) => (
          <li key={`${elem}${Math.random() * 5}`}>
            <Link to={`/products/${id}/${group}/${elem}`} onClick={() => setId()}>
              {elem}
            </Link>
          </li>
        ))}
      {err && <h2 style={{ color: "red" }}>{err}</h2>}
    </div>
  );
}
