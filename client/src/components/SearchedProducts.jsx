import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

export default function SearchedProducts() {
  const { searchedText } = useParams();
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    fetch(`/products/search/${searchedText}`)
      .then((resp) => resp.json())
      .then((res) =>
        setSearchedProducts(
          res.filter(
            (elem) =>
              elem.name.toLowerCase().includes(searchedText.toLowerCase()) ||
              elem.desc.toLowerCase().includes(searchedText.toLowerCase())
          )
        )
      )
      .catch((err) => setErr(err.message));
  }, [searchedText]);
  return (
    <main
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "10px",
        marginTop:"160px",
        minHeight:"44vh"
      }}
    >
      {searchedProducts.length > 0 ? (
        searchedProducts.map((item) => (
          <Product prods={item} key={item.itemId} />
        ))
      ) : (
        <h2 style={{ textAlign: "center" }}>
          Տվյալ տեսակի ապրանք չի հայտնաբերվել
        </h2>
      )}

      {err && <h2 style={{ color: "red", textAlign: "center" }}>{err}</h2>}
    </main>
  );
}
