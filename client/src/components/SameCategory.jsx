import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllProductsInSameCategory from "./AllProductsInSameCategory";
import ProductNav from "../components/ProductNav";
export default function SameCategory() {
  const { id, categorie } = useParams();

  const [sameCategory, setSameCategory] = useState([]);
  useEffect(() => {
    try {
      fetch(`/products/category?categoryId=${id}`)
        .then((resp) => resp.json())
        .then((res) => setSameCategory(res));
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  return (
    <>
      <ProductNav />
      <main>
        <h1 style={{ textAlign: "center" }}>{categorie}</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {sameCategory.length > 0 ? (
            sameCategory.map((elem) => (
              <AllProductsInSameCategory key={elem.itemId} prods={elem} />
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </main>
    </>
  );
}
