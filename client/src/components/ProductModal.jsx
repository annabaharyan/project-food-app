import React, { useState } from "react";
import Modal from "react-modal";
import styles from "../styles/modal.module.css";
import notification from "./notification";
import { useAddToCardMutation } from "../redux/cardApi";

export default function ProductModal({ isActive, setIsActive, elem }) {
  Modal.setAppElement("#root");
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
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(1 3 5 / 78%)",
      zIndex: 50,
    },
  };
  const [count, setCount] = useState(1);
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    notification();
    setInputText("");
  };
  const handleText = (e) => {
    setInputText(e.target.value);
  };
  const [addToCart] = useAddToCardMutation();
  const handleAddToCart = async (elem) => {
    if (elem) {
      await addToCart({ ...elem, count, otherInfo: inputText }).unwrap();
    }
  };
  return (
    <Modal
      style={customStyles}
      isOpen={isActive}
      onRequestClose={() => setIsActive(false)}
    >
      <button className={styles.close_modal} onClick={() => setIsActive(false)}>
        X
      </button>
      <div className={styles.modal_wrapper}>
        <div>
          <img src={require(`../assets/images/${elem.url}`)} alt="" />
        </div>
        <div className={styles.modal_info}>
          <h2>{elem.name}</h2>
          <p>{elem.desc}</p>
          <textarea
            name="marks"
            placeholder="Նշումներ պատվերի վերաբերյալ"
            onChange={handleText}
            value={inputText}
          ></textarea>
          <div className={styles.modal_order}>
            <h3>{elem.price} Դ</h3>
            <div className={styles.order_count}>
              <button
                onClick={() => setCount((cur) => (cur > 1 ? cur - 1 : 1))}
              >
                -
              </button>
              <span>{count}</span>
              <button onClick={() => setCount((cur) => cur + 1)}>+</button>
            </div>
            <button
              className={styles.offer}
              onClick={() => {
                handleAdd();
                handleAddToCart(elem);
              }}
            >
              ՈՒԶՈՒՄ ԵՄ
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
