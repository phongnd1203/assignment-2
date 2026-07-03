import { createContext, useCallback, useMemo, useReducer } from "react";

export const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existingItem = state.items.find((item) => item.product.id === action.product.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: Math.max(1, item.quantity - 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "UPDATE":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.productId
              ? { ...item, quantity: Math.max(1, action.quantity) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = useCallback((product) => dispatch({ type: "ADD", product }), []);
  const removeFromCart = useCallback(
    (productId) => dispatch({ type: "REMOVE", productId }),
    []
  );
  const incrementQuantity = useCallback(
    (productId) => dispatch({ type: "INCREMENT", productId }),
    []
  );
  const decrementQuantity = useCallback(
    (productId) => dispatch({ type: "DECREMENT", productId }),
    []
  );
  const updateQuantity = useCallback(
    (productId, quantity) => dispatch({ type: "UPDATE", productId, quantity }),
    []
  );
  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const itemCount = useMemo(
    () => state.items.reduce((total, item) => total + item.quantity, 0),
    [state.items]
  );

  const totalPrice = useMemo(
    () =>
      state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      updateQuantity,
      clearCart,
    }),
    [
      state.items,
      itemCount,
      totalPrice,
      addToCart,
      removeFromCart,
      incrementQuantity,
      decrementQuantity,
      updateQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
