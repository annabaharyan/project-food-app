import s from "../styles/card.module.css";
import { useGetCardProductsQuery } from "../redux/cardApi";
import OrderedProduct from "./OrderedProduct";

export default function Card({ isOpen, setIsOpen }) {
  const { data, isLoading, isError } = useGetCardProductsQuery();

  return (
    <div className={`${s.card}  ${isOpen ? s.scale_in_tr : undefined}`}>
      <div className={s.heading}>
        <h2>ԶԱՄԲՅՈւՂ</h2>
        <button onClick={() => setIsOpen(false)}>X</button>
      </div>
      <hr />
      {isLoading ? (
        <h2>Բեռնում...</h2>
      ) : isError ? (
        <h2>Ինչ-որ բան այն չէ...</h2>
      ) : data.length > 0 ? (
        <div className={s.list}>
          {data.map((elem) => (
            <OrderedProduct key={elem.itemId} item={elem} />
          ))}
          <hr />
          <div className={s.total}>
            <p>ԸՆԴԱՄԵՆԸ</p>
            <p>
              {data.reduce(
                (sum, elem) => (sum += elem.count * elem.price),
                0
              )}
              Դ
            </p>
          </div>
          <button className={s.buy}>Գնել</button>
        </div>
      ) : (
        <div>
          <h2>Զամբյուղը դատարկ է</h2>
        </div>
      )}
    </div>
  );
}
