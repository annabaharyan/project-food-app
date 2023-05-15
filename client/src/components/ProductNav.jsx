import { HiOutlineChevronDown } from "react-icons/hi";
import styles from "../styles/productNav.module.css";
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { Link } from "react-router-dom";
export default function ProductNav() {
  useEffect(() => {
    fetch(`/categories`)
      .then((resp) => resp.json())
      .then((res) => setProductTypes(res));
  }, []);
  const [productTypes, setProductTypes] = useState();
  const [id, setId] = useState();
  const handleClick = () => {
    setId();
  };
  return (
    <div className={styles.navigation}>
      <ul className={styles.ul}>
        {productTypes &&
          productTypes.map((elem) => (
            <li
              key={elem.id}
              onMouseEnter={() => {
                setId(elem.id);
              }}
              onMouseLeave={() => setId()}
            >
              <Link to={`/products/${id}/${elem.category}`} onClick={handleClick}>
                <span>{elem.category}</span>
                <HiOutlineChevronDown />
              </Link>
            </li>
          ))}
      </ul>
      {id && <ProductList id={id} setId={setId} group={productTypes[parseInt(id)-1].category} />}
    </div>
  );
}
