// React imports for context, hooks, and state management
import {createContext, useContext, useEffect, useReducer} from 'react';

// Create cart context for global cart state management
const CartContext = createContext();

/**
 * Load initial cart state from localStorage
 * Handles SSR compatibility and error cases
 * @returns {Object} Initial cart state with items array
 */
const loadInitialState = () => {
  // Check if running in browser environment (not server-side)
  if (typeof window !== 'undefined') {
    // Attempt to retrieve saved cart data from localStorage
    const saved = localStorage.getItem('cart');
    try {
      // Parse saved JSON data if it exists
      const parsed = saved ? JSON.parse(saved) : null;
      // Validate that parsed data has proper structure with items array
      if (parsed && Array.isArray(parsed.items)) return parsed;
      // Return default state if data is invalid
      return { items: [] };
    } catch {
      // Return default state if JSON parsing fails
      return { items: [] };
    }
  }
  // Return default state for server-side rendering
  return { items: [] };
}

/**
 * Cart reducer function to handle all cart state mutations
 * Manages adding, incrementing, decrementing, and removing items
 * Handles items from different sources (local vs external APIs)
 * @param {Object} state - Current cart state
 * @param {Object} action - Action object with type and payload
 * @returns {Object} New cart state
 */
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
       // Create item object with default quantity of 1 if not specified
       const itemToAdd = {...action.payload, quantity: action.payload.quantity || 1};
       // Check if item already exists in cart (by ID and source)
       const exists = state.items.find((i) => i.id === itemToAdd.id && (i.source === itemToAdd.source || (!i.source && !itemToAdd.source)));
       if (exists) {
         // If item exists, update quantity by adding to existing quantity
         return {
           ...state,
           items: state.items.map((i) =>
             i.id === itemToAdd.id && (i.source === itemToAdd.source || (!i.source && !itemToAdd.source))
               ? { ...i, quantity: i.quantity + itemToAdd.quantity }
               : i
           ),
         };
       }
       // If item doesn't exist, add new item to cart
       return {
         ...state,
         items: [...state.items, itemToAdd],
       };
    }
    case 'INCREMENT': {
      // Increase quantity of specific item by 1
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
      // Decrease quantity of specific item by 1, remove if quantity becomes 0
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id && (i.source === action.payload.source || (!i.source && !action.payload.source))
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          )
          .filter((i) => i.quantity > 0), // Remove items with 0 quantity
      };
    }
    case 'REMOVE_ITEM': {
      // Remove specific item completely from cart regardless of quantity
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && (i.source === action.payload.source || (!i.source && !action.payload.source)))
        ),
      };
    }
    default: {
      // Return current state for unknown action types
      return state;
    }
  }
}

/**
 * Cart Provider Component
 * Wraps application with cart context and manages cart state
 * Persists cart data to localStorage on every state change
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 */
export const CartProvider = ({ children }) => {
  // Initialize cart state using useReducer with cartReducer and loadInitialState
  const [cart, dispatch] = useReducer(cartReducer, {}, loadInitialState);

  // Effect to persist cart state to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]); // Dependency array ensures effect runs when cart state changes

  // Provide cart state and dispatch function to all child components
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 * Provides cart state and dispatch function to consuming components
 * @returns {Object} Cart context value with cart state and dispatch function
 */
export const useCart = () => useContext(CartContext);