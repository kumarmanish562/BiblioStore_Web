import {createContext, useContext, useEffect, useReducer} from 'react';

const CartContext = createContext();

const loadInitialState = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('cart');
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed && Array.isArray(parsed.items)) return parsed;
      return { items: [] };
    } catch {
      return { items: [] };
    }
  }
  return { items: [] };
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
       const itemToAdd = {...action.payload, quantity: action.payload.quantity || 1};
       const exists = state.items.find((i) => i.id === itemToAdd.id && (i.source === itemToAdd.source || (!i.source && !itemToAdd.source)));
       if (exists) {
         return {
           ...state,
           items: state.items.map((i) =>
             i.id === itemToAdd.id && (i.source === itemToAdd.source || (!i.source && !itemToAdd.source))
               ? { ...i, quantity: i.quantity + itemToAdd.quantity }
               : i
           ),
         };
       }
       return {
         ...state,
         items: [...state.items, itemToAdd],
       };
    }
    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && (i.source === action.payload.source || (!i.source && !action.payload.source))
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    case 'DECREMENT': {
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id && (i.source === action.payload.source || (!i.source && !action.payload.source))
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          )
          .filter((i) => i.quantity > 0),
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && (i.source === action.payload.source || (!i.source && !action.payload.source)))
        ),
      };
    }
    default: {
      return state;
    }
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, {}, loadInitialState);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);