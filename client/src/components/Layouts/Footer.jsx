import logo from "../../assets/images/dragon_footer_logo.png";
import { FiFacebook } from "react-icons/fi";
import { FiInstagram } from "react-icons/fi";
import { FaTripadvisor } from "react-icons/fa";
import styles from "../../styles/footer.module.css";
import { Link } from "react-router-dom";
import Contacts from "../Contacts";
export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <img src={logo} alt="dragon-garden-footer-logo" />

        <Contacts />
        <div className={styles.footer_nav}>
          <h4>Մենյու</h4>
          <ul>
            <li>
              <Link to="/">Գլխավոր</Link>
            </li>
            <li>
              <Link to="/contacts">Կապ մեզ հետ</Link>
            </li>
            <li>
              <Link to="/delivery-terms">Առաքման պայմաններ</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.icons}>
        <a
          href="https://www.facebook.com/Dragongarden.am"
          target="_blank"
          rel="noreferrer"
        >
          <FiFacebook />
        </a>
        <a
          href="https://www.instagram.com/dragongarden.am/"
          target="_blank"
          rel="noreferrer"
        >
          <FiInstagram />
        </a>
        <a
          href="https://www.tripadvisor.ru/Restaurant_Review-g293932-d12963402-Reviews-Dragon_Garden-Yerevan.html"
          target="_blank"
          rel="noreferrer"
        >
          <FaTripadvisor />
        </a>
      </div>
      <p>© 2023</p>
    </footer>
  );
}
