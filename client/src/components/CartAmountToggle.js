import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

const CartAmountToggle = (props) => {
  console.log(props.amount)
  return (
    <div className="cart-button">
      <div className="amount-toggle">
        <button onClick={() => props.setDecrease()}>
          <FaMinus />
        </button>
        <div className="amount-style">{props.amount}</div>
        <button onClick={() => props.setIncrease()}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
