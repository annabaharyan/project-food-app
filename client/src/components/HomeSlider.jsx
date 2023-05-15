import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";

export default function HomeSlider({ images }) {
  const [imageSlider, setImageSlider] = useState(true);

  useEffect(() => {
    let int = setInterval(() => {
      setImageSlider(!imageSlider);
    }, 1500);
    return () => {
      clearInterval(int);
    };
  });
  return (
    <div className={styles.slider}>
      {images.length > 0 && (
        <img
          src={
            imageSlider
              ? require(`../assets/images/${images[0]}`)
              : require(`../assets/images/${images[1]}`)
          }
          alt="slide"
        />
      )}

      <div className={styles.tic}>
        <span className={imageSlider ? styles.active : styles.inactive}></span>
        <span className={imageSlider ? styles.inactive : styles.active}></span>
      </div>
    </div>
  );
}
