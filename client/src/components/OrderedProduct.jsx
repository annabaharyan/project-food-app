import { IoTrashOutline } from "react-icons/io5";
import s from "../styles/card.module.css";
import {
  useDeleteFromCardMutation,
  useDecrementFromCardMutation,
  useIncrementFromCardMutation,
} from "../redux/cardApi";

export default function OrderedProduct({ item }) {
  const [deleteFromCard] = useDeleteFromCardMutation();
  const [decrementFromCard] = useDecrementFromCardMutation();
  const [incrementFromCard] = useIncrementFromCardMutation();
  const handleDeleteOrder = async (id) => {
    await deleteFromCard(id).unwrap();
  };
  const handleDecrement = async (id) => {
    decrementFromCard(id).unwrap();
  };
  const handleIncrement = async (id) => {
    incrementFromCard(id).unwrap();
  };
  return (
    <div className={s.orderedItem_wrapper}>
      <div className={s.prod_name}>
        <img src={require(`../assets/images/${item.url}`)} alt="" />
      </div>
      <div className={s.prod_count}>
        <h3>{item.name}</h3>
        <div className={s.col2}>
          <div className={s.counter}>
            <button
              onClick={() => {
                handleDecrement(item.itemId);
              }}
            >
              -
            </button>
            <span>{item.count}</span>
            <button
              onClick={() => {
                handleIncrement(item.itemId);
              }}
            >
              +
            </button>
          </div>
          <span>{item.count * item.price} Դ</span>
          <IoTrashOutline onClick={() => handleDeleteOrder(item.itemId)} />
        </div>
      </div>
    </div>
  );
}
