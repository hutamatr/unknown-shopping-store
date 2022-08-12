import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { CgMenuRight, CgClose } from "react-icons/cg";

import NavigationLinks from "./NavigationLinks";
import CartBadge from "../Cart/CartBadge";
import CartContext from "../../store/CartContext";

export const links = [
  { to: "/shop", name: "Shop" },
  { to: "/sale", name: "Sale" },
  { to: "/contact", name: "Contact" },
  { to: "/about", name: "About" },
  { to: "/login", name: "Login" },
  { to: "/cart", name: "Cart" },
];
const Navigation = () => {
  const [menuView, setMenuView] = useState(false);
  const { items } = useContext(CartContext);

  const cartItemsTotal = items.reduce((curr, item) => {
    return curr + item.amount;
  }, 0);

  const menuHandler = () => setMenuView((prevState) => !prevState);

  const LinksContent = (number, operator) => {
    const operatorFunc = {
      ">": (x, y) => x > y,
      "<": (x, y) => x < y,
    };
    return links.map((link, index) => {
      return operatorFunc[operator](index, number) ? (
        <NavigationLinks key={index} to={link.to} children={link.name} />
      ) : null;
    });
  };

  return (
    <nav className="fixed top-0 flex w-full max-w-6xl flex-row items-center justify-between border-x border-b border-dark-brown border-x-dark-brown bg-white-bone p-4 text-sm uppercase md:p-0 md:py-1">
      <ul
        className={`absolute top-full right-0 flex min-h-screen min-w-[70%] flex-col items-center gap-y-8 border-l border-b border-dark-brown bg-white-bone py-6 duration-500 md:static md:min-h-fit md:min-w-fit md:flex-row md:gap-x-px md:border-none md:bg-transparent md:py-0 md:px-0 ${
          !menuView ? "-right-[100vw]" : ""
        }`}
      >
        {LinksContent(4, "<")}
      </ul>
      <Link to={"/"} replace={true}>
        <h1 className="font-noto text-2xl font-semibold md:translate-x-1/3">
          !unknown
        </h1>
      </Link>
      <div className="flex flex-row items-center justify-center gap-x-6">
        <CartBadge onCartItems={cartItemsTotal} />
        <button onClick={menuHandler}>
          {!menuView ? (
            <CgMenuRight className="text-2xl md:hidden" />
          ) : (
            <CgClose className="text-2xl md:hidden" />
          )}
        </button>
      </div>

      <ul
        className={`absolute top-[45vh] right-0 flex min-w-[70%] flex-col-reverse items-center justify-center gap-y-8 py-4 duration-500 md:static md:min-w-fit md:flex-row md:gap-x-px md:py-0 md:px-0 ${
          !menuView ? "-right-[100vw]" : ""
        }`}
      >
        {LinksContent(3, ">")}
      </ul>
    </nav>
  );
};

export default Navigation;
