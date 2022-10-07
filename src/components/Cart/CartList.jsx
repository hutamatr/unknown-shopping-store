import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useCartContext from "../../hooks/useCartContext";
import { formatCurrencyToFixed } from "../../utils/formatCurrency";

const CartList = () => {
  const { items } = useCartContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const gotoShopHandler = () => navigate("/shop", { replace: true });

  return (
    <>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <span className="my-6 grid place-items-center text-xl font-semibold">
            Cart Empty
          </span>
          <button
            className="bg-dark-brown py-2 px-6 text-white-bone"
            onClick={gotoShopHandler}
          >
            Shop
          </button>
        </div>
      ) : (
        <ul className="flex max-h-screen flex-col gap-y-4 overflow-auto">
          {items.map((item) => {
            const { id, amount, title, price, image } = item;
            return (
              <li
                key={id}
                className="flex flex-row gap-x-4 border border-dark-brown"
              >
                <img
                  src={image}
                  alt={title}
                  className="w-32 border-r border-r-dark-brown bg-white object-contain p-4"
                />
                <div className="flex w-full flex-col gap-y-3 p-4">
                  <p className="font-medium uppercase">{title}</p>
                  <div className="flex flex-row gap-x-2">
                    <button className="text-xl font-bold">-</button>
                    <input
                      type="text"
                      value={amount}
                      className="max-w-[4rem] rounded p-1 text-center"
                    />
                    <button className="text-xl font-bold">+</button>
                  </div>
                  <span className="text-sm font-bold">
                    Rp. {formatCurrencyToFixed(price)} x {amount}
                  </span>
                  <button className="max-w-fit self-end px-3 py-2 text-sm duration-300 hover:bg-dark-brown hover:text-white-bone">
                    Remove
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CartList;
