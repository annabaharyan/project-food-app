import { Link, NavLink } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { BiCartAlt } from "react-icons/bi";
import { BiUser } from "react-icons/bi";
import logo from "../assets/images/logo.png";
import navStyles from "../styles/navbar.module.css";
import Search from "./Pages/Search";
import { AiOutlineMenu } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { useState } from "react";
import Card from "./Card";
import { useGetCardProductsQuery } from "../redux/cardApi";

export default function Navbar() {
  const [search, setSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { data } = useGetCardProductsQuery();

  return (
    <header className={navStyles.header}>
      <nav>
        <div className={navStyles.logoCall}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <a href="tel:+37494803112" className={navStyles.phone}>
            <FaPhoneAlt className={navStyles.phone} />
          </a>
        </div>
        <ul
          className={`${navStyles.pages} ${
            openMenu ? navStyles.active : undefined
          }`}
        >
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to="/">ԳԼԽԱՎՈՐ</NavLink>
          </li>
          <li onClick={() => setOpenMenu(false)}>
            <NavLink to="/contacts">ԿԱՊ ՄԵԶ ՀԵՏ</NavLink>
          </li>
        </ul>
        <ul className={navStyles.icons}>
          <li onClick={() => setSearch(true)}>
            <BsSearch className={navStyles.ics} />
          </li>
          <li onClick={() => setOpenCart(true)} className={navStyles.cartIcon}>
            <BiCartAlt className={navStyles.ics} />
            <span
              className={data?.length > 0 ? navStyles.redCycle : undefined}
            ></span>
          </li>
          <li>
            <BiUser className={navStyles.ics} />
          </li>
          <li>
            {!openMenu && (
              <AiOutlineMenu
                className={`${navStyles.ics} ${navStyles.menu}`}
                onClick={() => setOpenMenu(true)}
              />
            )}
            {openMenu && (
              <MdClose
                className={`${navStyles.ics} ${navStyles.menu}`}
                onClick={() => setOpenMenu(false)}
              />
            )}
          </li>
        </ul>
      </nav>
      {search && <Search isOpen={search} setIsActive={setSearch} />}
      {openCart && <Card isOpen={openCart} setIsOpen={setOpenCart} />}
    </header>
  );
}
