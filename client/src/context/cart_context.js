import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("NitinCart");
  if (localCartData) {
    try {
      return JSON.parse(localCartData);
    } catch (error) {
      console.error("Error parsing localCartData:", error);
    }
  }
  return [];
};


const initialState = {
  cart: getLocalCartData(),
  total_item: 0, 
  total_price: 0,
  shipping_fee: 70,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const setIncrement = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };

  // to remove the individual item from cart
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    
    let totalItem = state.cart.reduce((total, item) => total + item.amount, 0);
    let totalPrice = state.cart.reduce((total, item) => total + item.price * item.amount, 0);

    dispatch({ type: "CART_ITEM_PRICE_TOTAL", payload: { total_item: totalItem, total_price: totalPrice } });

    localStorage.setItem("NitinCart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrement,
      }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
