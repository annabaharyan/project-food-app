import Modal from "react-modal";
import styles from "../../styles/modal.module.css";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
Modal.setAppElement("#root");
export default function Search({ isOpen, setIsActive }) {
  const customStyles = {
    content: {
      width: "70%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "30px",
      backgroundColor: "transparent",
      color: "#fff",
      border: "none",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(1 3 5 / 78%)",
      zIndex: 15,
    },
  };
  const [searchText, setSearchText] = useState("");
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsActive(false)}
    >
      <div className={styles.search}>
        <h2>ՓՆՏՐԵԼ</h2>
        <div className={styles.input_wrapper}>
          <input
            type="text"
            className={styles.input}
            onChange={handleChange}
            value={searchText}
            placeholder="Գրել հայատառ"
          />
          <span className={styles.focus_border}></span>
          {searchText && (
            <span
              className={styles.clearInput}
              onClick={() => setSearchText("")}
            >
              X
            </span>
          )}
        </div>
        <Link to={`/products/search/${searchText}`}>
          <BsSearch
            onClick={() => {
              setIsActive(false);
              setSearchText("");
            }}
          />
        </Link>
        <Link to={`/products/search/${searchText}`}>
          <button
            className={styles.searchBtn}
            onClick={() => {
              setIsActive(false);
              setSearchText("");
            }}
          >
            ՓՆՏՐԵԼ
          </button>
        </Link>
      </div>
    </Modal>
  );
}
